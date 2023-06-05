export default {
  create: () => {
    return `
      insert into teachers (id, name)
      values (nextval('teachers_id_seq'), $1)
      returning id;
    `;
  },
  delete: (teacherId) => {
    return `
    delete from teachers
    where id=${teacherId};
    `;
  },
};
