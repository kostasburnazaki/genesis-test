import { Course } from "./types/Course";

const API_URL = 'http://api.wisey.app';
const VERSION_URL = '/api/v1';
const BASE_URL = API_URL + VERSION_URL;
const COURSES = '/core/preview-courses';
const AUTH = '/auth/anonymous?platform=subscriptions';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmFiMGQ2OC0yZjkzLTRiZGQtYjY3Ni0yZGNkNGNiOTI0MmUiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg4NzQzMDIsImV4cCI6MTY3OTc3NDMwMn0._wj8FF3p2jJSOM1YNcfCRxIFFCXi5R1-oW0rOd59JDo';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
): Promise<any> {
  const options: RequestInit = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(BASE_URL + url, options)
};

export const client = {
  getCourses: () => request<Course[]>(COURSES),
}