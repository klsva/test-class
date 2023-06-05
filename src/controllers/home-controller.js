import * as dao from '../data-access/home.dao.js';

export default {
  getAll: async (payload) => {
    //TODO check datatype
    let lessons;
    if (
      !payload.date &&
      !payload.status &&
      !payload.teacherIds &&
      !payload.studentsCount
    ) {
      lessons = await dao.findDefaultSearch(payload);
    } else {
      lessons = await dao.findByFilters(payload);
    }
    return lessons;
  },
};
