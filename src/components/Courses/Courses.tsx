import React, { FC, useRef } from "react";
import { Course } from "../../types/Course";
import { Player } from "../Player/Player";
import { Skills } from "../Skills"

type Props = {
  courses: Course[],
}

export const Courses: FC<Props> = ({ courses }) => {

  return (
    <ul className='has-text-centered'>
      {courses.map((course: Course) => (
        <li key={course.id} className="
            has-text-info
            pb-6
          ">
          <div className="container px-6">
            <figure className='image'>
              <img src={course.previewImageLink + '/cover.webp'} alt="" />
            </figure>

            <h2 className="
              subtitle
              has-text-info
              has-text-weight-bold
              is-uppercase
              is-underlined
            ">
              {course.title}
            </h2>

            <div className="columns">
              <div className="column">
                <Player url={course.meta.courseVideoPreview.previewImageLink} />
              </div>

              <div className="column">
                <h3 className="
                  is-size-5
                  is-uppercase
                  has-text-weight-semibold
                ">
                  Skills to acquire:
                </h3>

                <Skills skills={course.meta.skills} />
              </div>

              <div className="column columns is-flex is-justify-content-space-between is-flex-direction-column">
              <p className="
                  is-size-5
                  is-uppercase
                  has-text-weight-semibold
                ">
                  {course.lessonsCount} lessons
                </p>

                <p className="
                  is-size-5
                  is-uppercase
                  has-text-weight-semibold
                  is-italic
                ">
                  Rating: {course.rating}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}