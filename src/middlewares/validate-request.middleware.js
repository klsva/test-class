import { lessonCreateValidator } from '../utils/validate-request.js';

export const lessonCreateMw = async (req, res, next) => {
  const payload = { ...req.body };
  const { value, error } = await lessonCreateValidator(payload);
  if (error) {
    return next(error);
  }
  next();
};
