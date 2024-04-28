export const USER_PROGRESSION_QUERY = {
  SELECT_MODULE_STATUS_FOR_USER:
    'SELECT * FROM user_progression WHERE module_id = ? AND user_id = ?',
  UPDATE_MODULE_STATUS:
    'UPDATE user_progression SET module_id = ?, user_id = ?, status = ? WHERE id = ?',
};
