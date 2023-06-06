function addPageOffsetConditions(params) {
  //http://localhost:5000/api/?page=4&lessonsPerPage=2
  return `
    limit ${params.lessonsPerPage} 
    offset ${params.page * params.lessonsPerPage - params.lessonsPerPage}
  `;
}
function addDateConditions(params) {
  //http://localhost:5000/api/?date=2019-09-01,2019-09-03
  if (!params.date) {
    return ``;
  }
  if (params.date.length === 1) {
    return `
      and date = '${params.date[0]}'
    `;
  }
  if (params.date.length === 2) {
    params.date.sort((date1, date2) => {
      return new Date(date1) - new Date(date2);
    });
    return `
      and date between '${params.date[0]}' and '${params.date[1]}'
    `;
  }
  return;
}
function addStatusConditions(params) {
  if (!params.status) {
    return ``;
  }
  if (params.status) {
    return `
      and status = ${Number(params.status)}
    `;
  }
  return;
}
function addTeachersConditions(params) {
  if (!params.teacherIds) {
    return ``;
  } else {
    return `
    and teachers.id in (${params.teacherIds})
  `;
  }
}
function addTeachersNotNull(params) {
  if (!params.teacherIds) {
    return ``;
  }
  if (params.teacherIds) {
    return `
      and teachers is not null
    `;
  }
  return;
}
function addStudentsCount(params) {
  if (!params.studentsCount) {
    return ``;
  }
  if (params.studentsCount.length === 1) {
    return `
      and visitCount = ${Number(params.studentsCount[0])}
    `;
  }
  if (params.studentsCount.length === 2) {
    params.studentsCount.sort((a, b) => a - b);
    return `
      and visitCount between '${params.studentsCount[0]}' and '${params.studentsCount[1]}'
    `;
  }
  return;
}

export default {
  findDefaultLessons: (params) => {
    return `
      select 
      lessons.id as id,
      lessons.date::date  as date,
      lessons.title as title,
      lessons.status as status, 
      (
        select count(students.id)::int
        from lesson_students
        join students on students.id=lesson_students.student_id
        and lessons.id = lesson_students.lesson_id 
        and lesson_students.visit = true
      ) as visitCount,
      (
        select json_agg(json_build_object('id', students.id, 'name', students.name, 'visit', lesson_students.visit))
        from lesson_students
        join students on students.id=lesson_students.student_id
        and lessons.id = lesson_students.lesson_id
      ) as students,
      (
        select json_agg(teachers.*)
        from lesson_teachers
        join teachers on teachers.id=lesson_teachers.teacher_id
        and lessons.id = lesson_teachers.lesson_id
      ) as teachers 
    from lessons    
    order by id
    ${addPageOffsetConditions(params)}
    `;
  },
  findByFilters: (params) => {
    return `
    with cte as
    (
      select 
        lessons.id as id,
        lessons.date::date as date,
        lessons.title as title,
        lessons.status as status,
        (
          select count(students.id)::int
          from lesson_students
          join students 
          on students.id=lesson_students.student_id
          where lessons.id = lesson_students.lesson_id 
          and lesson_students.visit = true
        ) as visitCount,
        (
          select json_agg(json_build_object('id', students.id, 'name', students.name, 'visit', lesson_students.visit))
          from lesson_students
          join students 
          on students.id=lesson_students.student_id
          and lessons.id = lesson_students.lesson_id
        ) as students,
        (
          select json_agg(teachers.*)
          from lesson_teachers
          join teachers on teachers.id=lesson_teachers.teacher_id
          and lessons.id = lesson_teachers.lesson_id
          ${addTeachersConditions(params)}
        ) as teachers 
      from lessons
    )
    select id, date, title, status, visitCount, students, teachers from cte
        where 1=1 
        ${addDateConditions(params)} 
        ${addStatusConditions(params)}
        ${addTeachersNotNull(params)} 
        ${addStudentsCount(params)}
        order by id
        ${addPageOffsetConditions(params)}
    `;
  },
};
