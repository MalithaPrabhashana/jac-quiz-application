import:py from jac_cloud.core.architype { NodeAnchor }
import:py from dotenv { load_dotenv }
import os;

with entry {
    load_dotenv();

    database_host = os.getenv("DATABASE_HOST");
    database_name = os.getenv("DATABASE_NAME");

}

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

        users = NodeAnchor.Collection.find({"name": "user"});
        
        for user in users {
            user_node = user.architype;
            if (user_node.email == self.email) {
                report {"username": "User already exists"};
                return;
            }
        }

        if self.role == "teacher" {
            new_user = here ++> teacher(email=self.email, );
        } elif self.role == "student" {
            new_user = here ++> student(email=self.email, );
        }

        visit new_user;
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
        report {"role": "teacher", "user_id": jid(here)};
    }

    can show_message_student with student entry {
        report {"role": "teacher", "user_id": jid(here)};
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

walker create_quiz :visit_profile: {
    has title: str;
    has description: str;
    has duration: int;
    has questions: list;

    can create_quiz with teacher entry {
        new_quiz = here +:add_question:+> quiz(
            title=self.title,
            description=self.description,
            duration=self.duration,
        );
        visit new_quiz;
    }

    can add_question with quiz entry {
        for question_item in self.questions {
            new_question = here +:add_question:+> question(
                question=question_item["question"],
                answer=question_item["answer"]
            );
        }
        report {"message": "Quiz created successfully"};
    }
}   

walker get_all_quizzes :visit_profile: {
    can get_all_quizzes with teacher entry {
        quizzes =  [-:add_question:->(`?quiz)];
        report quizzes;
    }
}

walker get_questions: visit_profile: {
    has quiz_id: str;

    can get_questions with teacher entry {
        quiz = &self.quiz_id;
        questions = [quiz -:add_question:->(`?question)];
        report questions;
    }
}

walker edit_question: visit_profile: {
    has question_id: str;
    has edited_question: str;
    has edited_answer: str;

    can edit_question with teacher entry {
        question_item = &self.question_id;
        
        if question_item is not None {
            question_item.question = self.edited_question;
            question_item.answer = self.edited_answer;
        } else {
            report {"error": "Question not found"};
        }
    }
}


# not working correctly
# ----------------------------------------------
walker delete_question: visit_profile: {
    has question_id: str;

    can find_question with teacher entry {
        question_item = &self.question_id;
        
        if question_item is not None {
            del question_item;
            report {"message": "Question deleted successfully"};
        } else {
            report {"error": "Question not found"};
        }
    }
}
# ----------------------------------------------


walker get_students {
    obj __specs__ {
        static has auth: bool = False;
    }
    can get_students with `root entry {
        students = [-->(`?student)];
        report students;
    }
}