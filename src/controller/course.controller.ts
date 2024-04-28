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

export const getCourses = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  console.info(
    `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(COURSE_QUERY.SELECT_COURSES);
    return res
      .status(Code.OK)
      .send(
        new HttpResponse(Code.OK, Status.OK, 'Courses retrieved', result[0])
      );
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'An error occured'
        )
      );
  }
};

export const getCourse = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  return res.send();
};

export const updateCourseLikes = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  return res.send();
};
