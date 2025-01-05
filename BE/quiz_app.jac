import:py from jac_cloud.core.architype { NodeAnchor }

"""Nodes for the quiz app"""
node person {
    has id: str;
    has name: str;
}

node teacher: person: {
}

node student: person: {
}

node question {
    has question: str;
    has answer: str;
}

edge answer {}



"""Walkers for the quiz app"""
walker select_role {
    has role: str;

    obj __specs__ {
        static has auth: bool = False;
    }

    can select_role with `root entry {
        if (self.role == "teacher") {
            new_teacher = here ++> teacher("TeacherID", "teacherName");
            visit new_teacher;

        } elif (self.role == "student") {
            new_student = here ++> student("StudentID", "studentName");
            visit new_student;
        };
    }
}

walker add_question: select_role: {
    has added_question: str;
    has added_answer: str;

    can add_question with teacher entry {
        new_question = here ++> question(question=self.added_question, answer=self.added_answer);
        visit new_question;
    }

    can report_question with question entry {
        report here;
    }
}

walker get_all_questions: select_role: {

    can get_all_questions with student entry {
        self.question_list: list = [];

        all_questions = NodeAnchor.Collection.find({"name": "question"});

        for question in all_questions {
            question_node = question.architype;

            self.question_list.append(
                {"question": question_node.question, "id": jid(question_node)}
            );
        }

        report self.question_list;
    }
}


walker answer_question: select_role: {
    has question_id: str;
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