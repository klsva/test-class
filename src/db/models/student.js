export default {
  create: () => {
    return `
      insert into students (id, name)
      values (nextval('students_id_seq'), $1)
      returning id;
    `;
  },
  delete: (studentId) => {
    return `
    delete from students
    where id=${studentId};
    `;
  },
};
