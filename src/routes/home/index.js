import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import homeController from '../../controllers/home-controller.js';
import { searchLessonsValidator } from '../../utils/validate-request.js';

const router = Router();
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const query = req.query;
    const payload = {
      date: query.date ? query.date.split(',') : null,
      status: query.status ? query.status : null,
      teacherIds: query.teacherIds ? query.teacherIds : null,
      studentsCount: query.studentsCount
        ? query.studentsCount.split(',')
        : null,
      page: query.page ? query.page : 1,
      lessonsPerPage: query.lessonsPerPage ? query.lessonsPerPage : 5,
    };
    const { error } = await searchLessonsValidator(payload);
    if (error) {
      next(error);
    } else {
      const list = await homeController.getAll(payload);
      return res.status(200).send(list);
    }
  })
);

export default router;
