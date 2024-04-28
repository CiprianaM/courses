import { ModuleQuery } from './interfaces/moduleQuery';

export const MODULE_QUERY: ModuleQuery = {
  SELECT_MODULES_FOR_COURSE:
    'SELECT * FROM modules WHERE course_id = ? ORDER BY position ASC',
  SELECT_MODULE: 'SELECT * FROM modules WHERE id = ?',
};
