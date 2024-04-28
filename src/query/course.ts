export const COURSE_QUERY = {
  SELECT_COURSES: 'SELECT * FROM courses ORDER BY created_at DESC LIMIT 50',
  SELECT_COURSE: 'SELECT * FROM courses WHERE id = ?',
  UPDATE_COURSE:
    'UPDATE courses SET name = ?, likes = ?, instructor = ?, instructor_image_url = ? WHERE id = ?',
};
