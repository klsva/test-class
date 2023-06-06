import Joi from 'joi';

export const lessonCreateValidator = async (data) => {
  const teacherIds = Joi.array().items(Joi.number());
  const title = Joi.string();
  const days = Joi.array().items(Joi.number().min(0).max(6));
  const firstDate = Joi.date()
    .greater('now')
    .message('"date" cannot be earlier than today');
  const lessonsCount = Joi.number().positive().integer().greater(0);
  const lastDate = Joi.date()
    .greater('now')
    .message('"date" cannot be earlier than today');

  const schema = Joi.object({
    teacherIds: teacherIds.required(),
    title: title.required(),
    days: days.required(),
    firstDate: firstDate.required(),
    lessonsCount: lessonsCount.optional().allow(''),
    lastDate: lastDate.optional().allow(''),
  });
  return schema.validate(data);
};

export const searchLessonsValidator = async (data) => {
  const date = Joi.array().items(Joi.date());
  const status = Joi.number().valid(0, 1);
  const teacherIds = Joi.array().items(Joi.string());
  const studentsCount = Joi.array().items(Joi.number());
  const page = Joi.number().integer();
  const lessonsPerPage = Joi.number().integer();

  const schema = Joi.object({
    date: date.allow(null).allow('').optional(),
    status: status.allow(null).allow('').optional(),
    teacherIds: teacherIds.allow(null).allow('').optional(),
    studentsCount: studentsCount.allow(null).allow('').optional(),
    page: page.allow(null).allow('').optional(),
    lessonsPerPage: lessonsPerPage.allow(null).allow('').optional(),
  });
  return schema.validate(data);
};
