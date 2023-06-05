import { lessonCreateValidator } from '../utils/validate-request.js';

export const lessonCreateMw = (req, res, next) => {
  const payload = { ...req.body };
  const result = lessonCreateValidator(payload);
  if (result.error) {
    return next(result.error);
  }
  next();
};
