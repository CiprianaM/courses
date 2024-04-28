import { Pool, QueryResult } from 'mysql2/promise';
import { Configuration } from '../interfaces/Configuration';
import { mock } from 'jest-mock-extended';
import { CourseQuery } from '../../query/interfaces/courseQuery';
import { CourseDataAccessLayer } from '../CourseDataAccessLayer';

const mockQueries = mock<CourseQuery>();
const mockPool = mock<Pool>();

const courseDataAccessLayer = new CourseDataAccessLayer(mockPool, mockQueries);

describe(CourseDataAccessLayer, () => {
  describe('getCourses', () => {
    it('schould get all courses', async () => {
      mockPool.query.mockResolvedValue([[{ id: 5 }] as QueryResult, []]);
      const expectedResult = await courseDataAccessLayer.getCourse('5');
      expect(expectedResult).toEqual([{ id: 5 }]);
    });
    it('schould get throw if query throws', async () => {
      mockPool.query.mockRejectedValue(new Error('fake error'));
      expect(courseDataAccessLayer.getCourse('20')).rejects.toThrow();
    });
  });
});
