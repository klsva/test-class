import axios from 'axios';
import { nanoid } from 'nanoid';
import app from '../../src/app';
import db from '../../src/db/db';
import queryTeacher from '../../src/db/models/teacher.js';

describe('Test /lessons endpoint', () => {
  const port = 8007;
  const path = `http://localhost:${port}/api/lessons`;
  const testName = nanoid(5);
  const qnty = 2;
  let teacherIds = [];
  let lessonsIds = [];

  beforeAll(async () => {
    await app.start(port);
    let i = 0;
    //create teachers
    while (i < qnty) {
      //create teachers
      const queryCreateTeacher = queryTeacher.create();
      const resTeacher = await db.query(queryCreateTeacher, [testName]);
      teacherIds.push(resTeacher.rows[0].id);
      i++;
      console.log('teach');
    }
  }, 60000);

  afterAll(async () => {
    for await (let id of lessonsIds) {
      await db.query(`delete from lesson_teachers where lesson_id =$1`, [id]);
      await db.query(`delete from lessons where id =$1`, [id]);
    }
    for await (let id of teacherIds) {
      await db.query(`delete from teachers where id =$1`, [id]);
    }
    await app.stop();
  }, 60000);

  it('Test for method POST. It Should return list of new lessons ids', async () => {
    const data = {
      teachersIds: teacherIds,
      title: testName,
      days: [2, 6],
      firstDate: '2023-08-05',
      lessonsCount: 3,
      lastDate: '2023-10-01',
    };
    const response = await axios.post(path, data);
    lessonsIds = response.data;
    expect(response.status).toEqual(201);
  }, 60000);
});
