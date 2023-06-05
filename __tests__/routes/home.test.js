import axios from 'axios';
import { nanoid } from 'nanoid';
import moment from 'moment';
import app from '../../src/app';
import db from '../../src/db/db';
import queryStudent from '../../src/db/models/student.js';
import queryTeacher from '../../src/db/models/teacher.js';
import queryLesson from '../../src/db/models/lesson.js';

describe('Test / endpoint', () => {
  const port = 8006;
  const path = `http://localhost:${port}/api/`;
  const testName = nanoid(5);
  let date = '2033-01-01';
  const qnty = 2;
  let lessonIds = [];
  let studentIds = [];
  let teacherIds = [];
  //add status and visit
  beforeAll(async () => {
    await app.start(port);
    let i = 0;
    let j = 0;
    //create mock data
    while (i < qnty) {
      //create student
      const queryCreateStudent = queryStudent.create();
      const resStudent = await db.query(queryCreateStudent, [testName]);
      studentIds.push(resStudent.rows[0].id);
      //create Teacher
      const queryCreateTeacher = queryTeacher.create();
      const resTeacher = await db.query(queryCreateTeacher, [testName]);
      teacherIds.push(resTeacher.rows[0].id);
      //create lesson
      const queryCreateLesson = queryLesson.create();
      const resLesson = await db.query(queryCreateLesson, [
        moment(date).add(i, 'days').format('YYYY-MM-DD'),
        testName,
      ]);
      lessonIds.push(resLesson.rows[0].id);
      //create coonection l-t
      const queryConnectionLessonTeacher =
        queryLesson.addConnectionLessonTeacher();
      await db.query(queryConnectionLessonTeacher, [
        resLesson.rows[0].id,
        resTeacher.rows[0].id,
      ]);
      const queryConnectionLessonSudent =
        queryLesson.addConnectionLessonStudents();
      await db.query(queryConnectionLessonSudent, [
        resLesson.rows[0].id,
        resStudent.rows[0].id,
      ]);
      i++;
    }
    while (j < qnty) {
      //create lesson
      const resLesson = await db.query(
        `insert into lessons (id, date, title, status)
        values (nextval('lessons_id_seq'), $1, $2, $3)
        returning id;`,
        [moment(date).add(j, 'days').format('YYYY-MM-DD'), testName, 1]
      );
      lessonIds.push(resLesson.rows[0].id);
      //create connections l-t
      const queryConnectionLessonTeacher =
        queryLesson.addConnectionLessonTeacher();
      await db.query(queryConnectionLessonTeacher, [
        resLesson.rows[0].id,
        teacherIds[0],
      ]);
      await db.query(queryConnectionLessonTeacher, [
        resLesson.rows[0].id,
        teacherIds[1],
      ]);
      //create connections l-s
      await db.query(
        `insert into lesson_students (lesson_id, student_id, visit)
        values ($1, $2, $3)
        returning *
        `,
        [resLesson.rows[0].id, studentIds[0], true]
      );
      await db.query(
        `insert into lesson_students (lesson_id, student_id, visit)
        values ($1, $2, $3)
        returning *
        `,
        [resLesson.rows[0].id, studentIds[1], true]
      );
      j++;
    }
  }, 60000);

  afterAll(async () => {
    for await (let id of lessonIds) {
      await db.query(`delete from lesson_students where lesson_id =$1`, [id]);
      await db.query(`delete from lesson_teachers where lesson_id =$1`, [id]);
      await db.query(`delete from lessons where id =$1`, [id]);
    }
    for await (let id of studentIds) {
      await db.query(`delete from students where id =$1`, [id]);
    }
    for await (let id of teacherIds) {
      await db.query(`delete from teachers where id =$1`, [id]);
    }
    await app.stop();
  }, 60000);

  it('Test for method GET. It should return list of lessons with dates between', async () => {
    const queryDB = `with cte as (select lessons.id as id, lessons.date::date as date, 
      lessons.title as title, lessons.status as status, (select count(students.id)::int
      from lesson_students join students on students.id=lesson_students.student_id
      where lessons.id = lesson_students.lesson_id and lesson_students.visit = true) 
      as visitCount, (select json_agg(json_build_object('id', students.id, 'name', 
      students.name, 'visit', lesson_students.visit)) from lesson_students join students 
      on students.id=lesson_students.student_id and lessons.id = lesson_students.lesson_id) 
      as students, (select json_agg(teachers.*) from lesson_teachers join teachers 
      on teachers.id=lesson_teachers.teacher_id and lessons.id = lesson_teachers.lesson_id
      ) as teachers from lessons) select id, date, title, status, visitCount, students, teachers from cte
      where 1=1
      and date between '${date}' and '${moment(date)
      .add(1, 'days')
      .format('YYYY-MM-DD')}'
      order by id
    `;
    //console.log(queryDB);
    const res = await db.query(queryDB);
    //console.log('res', res.rows);
    const expectedResult = res.rows;
    const query = `?date=2033-01-01,2033-01-02`;
    //console.log('path+q', path+query);
    const response = await axios.get(path + query);
    expect(response.status).toEqual(200);
    // TODO: deal with datatypes
    expect(JSON.stringify(response.data)).toStrictEqual(
      JSON.stringify(expectedResult)
    );
    //expect(response.data).toStrictEqual(expectedResult);
  }, 60000);
});
