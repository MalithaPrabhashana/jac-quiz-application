import:py from jac_cloud.core.architype { NodeAnchor }

"""Nodes for the quiz app"""
node profile {
    has username: str;
    has password: str;
    has role: str;
}

node person {
    has id: str;
    has name: str;
}

node teacher :person: {}

node student :person: {}

node question {
    has question: str;
    has answer: str;
    has teacher_id: str;
}

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
            role=self.role
        );
        visit new_user;
    }

    can report_user_registration_info with profile entry {
        report {"username": here.username, "password": here.password};
    }
}

walker login_user {
    has email: str;
    has password: str;

    obj __specs__ {
        static has auth: bool = False;
    }
    can login_user with `root entry {
        users = NodeAnchor.Collection.find({"name": "profile"});
        
        for user in users {
            user_node = user.architype;
            if (user_node.username == self.email
                && user_node.password == self.password) {
                self.id = jid(user_node);
                report self.id;
            }
        }
    }
}

walker select_role {
    has user_id: str;

    obj __specs__ {
        static has auth: bool = False;
    }
    can select_role with `root entry {
        user = &self.user_id;
        self.role = user.role;

        print(f"User role: {self.role}");

        if (self.role == "teacher") {
            new_teacher = here ++> teacher(self.user_id, "teacherName");
            visit new_teacher;

        } elif (self.role == "student") {
            new_student = here ++> student(self.user_id, "studentName");
            visit new_student;
        }
    }
}

walker add_question :select_role: {
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

walker get_all_questions :select_role: {
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

walker answer_question :select_role: {
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