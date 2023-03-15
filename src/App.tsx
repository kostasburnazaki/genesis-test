import React, { useEffect, useState } from 'react';
import { client } from './api';
import { Course } from './types/Course';
import './App.css';

export const App = () => {
  const [courses, setCourses] = useState<void | Course[]>();

  useEffect(() => {
    client.getCourses()
      .then(res => {
        console.log(res);
      })
    .catch(err => console.warn(err))
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <button className='button is-primary is-small'>Test</button>

    </div>
  );
};
