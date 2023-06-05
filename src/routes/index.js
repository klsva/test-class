import { Router } from 'express';
import home from './home/index.js';
import lessons from './lessons/index.js';

const api = Router();
api.use(home);
api.use(lessons);

export default api;
