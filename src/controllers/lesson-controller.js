import * as dao from '../data-access/lesson.dao.js';

export default {
  //creates new lessons
  create: async (payload) => {
    const newLessons = await dao.create(payload);
    return newLessons;
  },
};
