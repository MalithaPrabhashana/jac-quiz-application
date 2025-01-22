import:py from jac_cloud.core.architype { NodeAnchor }
import:py from dotenv {load_dotenv}
import os;

with entry {
    load_dotenv();

    database_host = os.getenv("DATABASE_HOST");
    database_name = os.getenv("DATABASE_NAME");

}


"""Nodes for the quiz app"""
node profile {
    has username: str;
    has password: str;
}

node teacher {}

node student {}

node quiz {
    has name: str;
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


"""Walkers for the quiz app"""
walker sign_up_user {
    has username: str;
    has password: str;
    has role: str;

    obj __specs__ {
        static has auth: bool = False;
    }
    can sign_up_user with `root entry {

        # Before creating new profile check if the user already exists
        users = NodeAnchor.Collection.find({"name": "profile"});

        for user in users {
            user_node = user.architype;
            if (user_node.username == self.username) {
                report {"username": "User already exists"};
                return;
            }
        }

        new_user = here ++> profile(
            username=self.username,
            password=self.password,
        );
        
        visit new_user;
    }

    can create_role_account with profile entry {
        if (self.role == "teacher") {
            new_teacher = here ++> teacher(user_id=jid(here));
            visit new_teacher;
        } elif (self.role == "student") {
            new_student = here ++> student(user_id=jid(here));
            visit new_student;
        };

        report {"message": "User created successfully"};
    }
}

walker login_user {
    has email: str;
    has password: str;

    obj __specs__ {
        static has auth: bool = False;
    }
    
    can login_user with `root entry {

        users = [-->(`?profile)];
        
        for user in users {
            if (user.username == self.email
                && user.password == self.password) {
                visit user;
            }
        }
    }

    can choose_correct_account with profile entry {
        visit [-->];
    }
}

walker visit_profile {
    obj __specs__ {
        static has auth: bool = False;
    }

    can visit_profile with `root entry {

    }

    can visit_profile with profile entry {
        report {"message": "User logged in successfully"};
    }
}

walker create_quiz :visit_profile: {
    has quiz_name: str;
    has quiz_description: str;
    has quiz_duration: int;
    has questions: list;

    can create_quiz with profile entry {
        print("Creating quiz");
        new_quiz = here +:add_question:+> quiz(
            name=self.quiz_name,
            description=self.quiz_description,
            duration=self.quiz_duration,
            questions=self.questions
        );

        visit new_quiz;

        report {"message": "Quiz created successfully"};
    }
}

walker get_all_quizzes :visit_profile: {
    can get_all_quizzes with profile entry {
        print("Getting all quizzes");
        report [-->-:add_question:->(`?quiz)];


        # all_quizzes = NodeAnchor.Collection.find({"name": "quiz"});
        
        # for quiz in all_quizzes {
        #     quiz_node = quiz.architype;
        #     if quiz_node.teacher_id == self.user_id {
        #         self.quiz_list.append(
        #             {
        #                 "teacherid": quiz_node.teacher_id,
        #                 "id": jid(quiz_node),
        #                 "name": quiz_node.name,
        #                 "description": quiz_node.description,
        #                 "duration": quiz_node.duration,
        #                 "questions": quiz_node.questions
        #             }
        #         );
        #     }
        # }
    }
}

walker add_question {
    has added_question: str;
    has added_answer: str;

    can add_question with teacher entry {
        new_question = here ++> question(
            question=self.added_question,
            answer=self.added_answer,
            teacher_id=here.id
        );

        visit new_question;
    }

    can report_question with question entry {
        report here;
    }
}

walker get_all_questions {
    has teacher_id: str;

    can get_all_questions with student entry {
        self.question_list: list = [];

        all_questions = NodeAnchor.Collection.find({"name": "question"});
        
        for question in all_questions {
            question_node = question.architype;
            if (question_node.teacher_id == self.teacher_id) {
                self.question_list.append(
                    {
                        "question": question_node.question,
                        "id": jid(question_node)
                    }
                );
            }
        }

        report self.question_list;
    }
}

walker answer_question {
    has question_id: str;
    has student_id: str;
    has student_answer: str;

    can answer_question with student entry {
        question_node = &self.question_id;
        here +:answer():+> question_node;

        if (self.student_answer == question_node.answer) {
            self.result = "Correct answer";
        } else {
            self.result = "Wrong answer";
        }
        report self.result;
    }
}
