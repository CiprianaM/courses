import { Request, Response } from 'express';
import { connection } from '../config/mysql.config';
import { COURSE_QUERY } from '../query/course.query';
import { Code } from '../enum/code.enum';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/status.enum';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

type ResultSet = [
  RowDataPacket[] | RowDataPacket[][] | ResultSetHeader | ResultSetHeader[],
  FieldPacket[]
];

export const getCompletedCoursesForUser = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  return res.send();
};

export const getStartedCoursesForUser = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  return res.send();
};
