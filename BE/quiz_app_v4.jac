import:py from jac_cloud.core.architype { NodeAnchor }
import:py from dotenv {load_dotenv}
import os;

"""Nodes for the quiz app"""

node teacher {
    has email: str;
}

node student {
    has email: str;
}

node quiz {
    has title: str;
    has description: str;
    has duration: int;
    has questions: list;
}

node question {
    has question: str;
    has answer: str;
}

edge add_question {}

edge answer {}



"""walkers for quiz app"""

walker sign_up_user {
    has email: str;
    has role: str;

    obj __specs__ {
        static has auth: bool = False;
    }
    can sign_up_user with `root entry {

        if self.role == "teacher" {
            self.users = NodeAnchor.Collection.find({"name": "teacher"});
        } elif self.role == "student" {
            self.users = NodeAnchor.Collection.find({"name": "student"});
        }

        for user in self.users {
            user_node = user.architype;

            if (user_node.email == self.email) {
                report {"message": "User already exists"};
                return;
            }
        }

        if self.role == "teacher" {
            new_user = here ++> teacher(
                email=self.email,
            );
        } elif self.role == "student" {
            new_user = here ++> student(
                email=self.email,
            );
        }
        visit new_user;
        report {"message": "User created successfully"};
    }
}


walker login_user {
    has email: str;

    obj __specs__ {
        static has auth: bool = False;
    }
    can login_user with `root entry {

        users = [-->];

        for user in users {
            if (user.email == self.email) {
                visit user;
            }
        }
    }

    can show_message_teacher with teacher entry {
        report {
            "role": "teacher",
            "user_id": jid(here)
        };
    }

    can show_message_student with student entry {
        report {
            "role": "student",
            "user_id": jid(here)
        };
    }
}


walker visit_profile {
    has user_id: str;

    obj __specs__ {
        static has auth: bool = False;
    }

    can visit_profile with `root entry {
        user = &self.user_id;
        visit user;
    }
}


walker create_quiz: visit_profile: {
    has title: str;
    has description: str;
    has duration: int;
    has questions: list;

    can create_quiz with teacher entry {
        new_quiz = here +:add_question:+> quiz(
            title=self.title,
            description=self.description,
            duration=self.duration,
            questions=self.questions
        );
        visit new_quiz;

        report {"message": "Quiz created successfully"};
    }
}

walker get_all_quizzes: visit_profile: {
    can get_all_questions with teacher entry {
        report [-:add_question:->(`?quiz)];
    }
}


walker get_all_students {
    obj __specs__ {
        static has auth: bool = False;
    }

    can get_all_students with `root entry {
        report [-->(`?student)];
    }
}

can config_server() {
    import:py from jac_cloud { FastAPI }
    import:py from fastapi.middleware.cors { CORSMiddleware }
    FastAPI.get().add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
    );
    FastAPI.enable();
}

with entry {
    load_dotenv();

    database_host = os.getenv("DATABASE_HOST");
    database_name = os.getenv("DATABASE_NAME");
    config_server();
}