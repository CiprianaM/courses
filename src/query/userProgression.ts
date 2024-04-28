import { ProgressionQuery } from './interfaces/progressionQuery';

export const USER_PROGRESSION_QUERY: ProgressionQuery = {
  SELECT_MODULE_STATUS_FOR_USER:
    'SELECT * FROM user_progression WHERE module_id = ? AND user_id = ?',
  UPDATE_MODULE_STATUS_FOR_USER:
    'UPDATE user_progression SET status = ? WHERE id = ?',
  CREATE_MODULE_STATUS_FOR_USER:
    'INSERT INTO user_progression(user_id, module_id, status) VALUES (?, ?, ?);',
};
