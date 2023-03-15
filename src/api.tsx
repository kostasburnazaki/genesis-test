import { Course } from "./types/Course";
import { Token } from "./types/Token";

const API_URL = 'https://api.wisey.app';
const VERSION_URL = '/api/v1';
const BASE_URL = API_URL + VERSION_URL;
const COURSES = '/core/preview-courses';
const AUTH = '/auth/anonymous?platform=subscriptions';


function request<T>(
  url: string,
): Promise<any> {
  return fetch(BASE_URL + AUTH)
    .then(res => res.json())
    .then(({ token }: Token) => {
      const options: RequestInit = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        }
      }
      return fetch(BASE_URL + url, options)
        .then(res => res.json())
    })
};

export const client = {
  getCourses: () => request<Course[]>(COURSES),
}