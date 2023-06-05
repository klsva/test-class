import moment from 'moment';
import db from '../db/db.js';
import lesson from '../db/models/lesson.js';
import { createDateArr } from '../utils/create-date-arr.js';

// Create lessons
export async function create(payload) {
  let result = [];
  if (moment(payload.firstDate, 'YYYY-MM-DD', true).isValid()) {
    //creates array of lesson's dates
    const datesArr = await createDateArr(
      payload.firstDate,
      payload.days,
      payload.lessonsCount,
      payload.lastDate
    );
    if (typeof datesArr === 'string') {
      throw new Error(datesArr);
    }
    //split teachers IDs
    for await (let teacherId of payload.teachersIds) {
      //create lesson by date
      for await (let date of datesArr) {
        const paramsLesson = [date, payload.title];
        const queryCreateLesson = lesson.create();
        const res = await db.query(queryCreateLesson, paramsLesson);
        const lessonId = res.rows[0].id;
        const paramsConnection = [lessonId, teacherId];
        const queryCreateConnection = lesson.addConnectionLessonTeacher();
        await db.query(queryCreateConnection, paramsConnection);
        result.push(lessonId);
      }
    }
  }
  if (!result) return null;
  return result;
}
