import React, { useEffect, useState } from 'react';
import './App.css';
import { client } from './api';
import { Course } from './types/Course';
import { Loader } from './components/Loader';
import { Pagination } from './components/Pagination';
import { Courses } from './components/Courses'

export const App = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage] = useState<number>(5);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)

  useEffect(() => {
    client.getCourses()
      .then(coursesData => {
        setCourses(coursesData.courses);
        setLoading(false);
      })
      .catch(err => console.warn(err))
  }, []);

  return (
    <>
      <header className='has-background-light'>
        <h1 className="
          title
          is-size-1
          has-text-centered
          has-text-primary
          py-6
        ">
          Courses
        </h1>
      </header>

      <main className='has-background-light'>
        {loading
          ? <Loader />
          : <Courses courses={currentCourses} />}
          <Pagination
            coursesPerPage={coursesPerPage}
            totalCourses={courses.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
      </main>

      <footer>
      </footer>

    </>
  );
};
