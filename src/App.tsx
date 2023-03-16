import React, { useEffect, useState } from 'react';
import './App.css';
import { client } from './api';
import { Course } from './types/Course';
import { Loader } from './components/Loader';
import { Pagination } from './components/Pagination';
import { Courses } from './components/Courses'
import { Navigate, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { CourseComponent } from './components/CourseComponent';

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
        <NavLink to='/home'>
          <h1 className="
              is-link
              title
              is-size-1
              has-text-centered
              has-text-primary
              py-6
            ">
            Courses
          </h1>
        </NavLink>
      </header>

      <main className='has-background-light'>
        <Routes>
          <Route
            path="/"
            element={
              loading
                ? <Loader />
                :
                <>
                  <Pagination
                    coursesPerPage={coursesPerPage}
                    totalCourses={courses.length}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                  />
                  <Courses courses={currentCourses} />
                  <Pagination
                    coursesPerPage={coursesPerPage}
                    totalCourses={courses.length}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                  />
                </>
            }

          />

          <Route
            path="home"
            element={
              <Navigate to="/" replace />
            }
          />

          <Route
            path=":slug"
            element={
              <CourseComponent
                courses={courses}
              />
            }
          />
        </Routes>
      </main>

      <footer>
      </footer>
    </>
  );
};
