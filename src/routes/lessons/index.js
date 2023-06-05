import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import lessonController from '../../controllers/lesson-controller.js';
import { lessonCreateMw } from '../../middlewares/validate-request.middleware.js';

const router = Router();
router.post(
  '/lessons',
  lessonCreateMw,
  asyncHandler(async (req, res, next) => {
    const payload = {
      teachersIds: req.body.teachersIds,
      title: req.body.title,
      days: req.body.days,
      firstDate: req.body.firstDate,
      lessonsCount: req.body.lessonsCount ? req.body.lessonsCount : null,
      lastDate: req.body.lastDate ? req.body.lastDate : null,
    };
    const newLessons = await lessonController.create(payload);
    return res.status(201).send(newLessons);
  })
);
export default router;
