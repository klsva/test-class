import db from '../db/db.js';
import home from '../db/models/home.js';

// Gets lessons's list uses page, perPage
export async function findDefaultSearch(payload) {
  const result = await db.query(home.findDefaultLessons(payload));
  if (!result || !result.rows || !result.rows.length) return null;
  return result.rows;
}

// Gets lessons's list date, status, teacherIds, studentsCounr, page, perPage
export async function findByFilters(payload) {
  const result = await db.query(home.findByFilters(payload));
  if (!result || !result.rows) return null;
  if (!result.rows.length) return [];
  return result.rows;
}
