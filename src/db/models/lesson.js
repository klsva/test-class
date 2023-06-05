export default {
  create: () => {
    return `
      insert into lessons (id, date, title)
      values (nextval('lessons_id_seq'), $1, $2)
      returning id;
    `;
  },
  addConnectionLessonTeacher: () => {
    return `
      insert into lesson_teachers (lesson_id, teacher_id)
      values ($1, $2)
      returning *;
    `;
  },
  deleteConnectionLessonTeacher: (lessonId) => {
    return `
    delete from lesson_teachers
    where lesson_id=${lessonId};
    `;
  },
  delete: (lessonId) => {
    return `
    delete from lessons
    where id=${lessonId};
    `;
  },
  addConnectionLessonStudents: () => {
    return `
      insert into lesson_students (lesson_id, student_id)
      values ($1, $2)
      returning *;
    `;
  },
  deleteConnectionLessonStudents: (lessonId) => {
    return `
    delete from lesson_students
    where lesson_id=${lessonId};
    `;
  },
};
