import classNames from "classnames";
import React, { useRef } from "react";
import { Dispatch, FC, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { client } from "../../api";
import { Course, DetailedCourse, Lesson } from "../../types/Course";
import { VideoJS } from "../Player";

type Props = {
  courses: Course[],
}

export const CourseComponent: FC<Props> = ({
  courses,
}) => {

  const [course, setCourse] = useState<DetailedCourse>();
  const { slug = '' } = useParams();
  const playerRef = useRef(null);


  useEffect(() => {
    if (courses.length) {
      const coursePreview = courses.find((course: Course) => course.meta.slug === slug);
      if (coursePreview) {
        client.getCourse(coursePreview.id)
          .then(courseData => {
            setCourse(courseData);
          })
          .catch(err => console.warn(err))
      };
    };
  }, []);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on("pause", function () {
      localStorage.setItem(player.id_, player.currentTime());
    });
    player.on("play", function () {
      player.currentTime(localStorage.getItem(player.id_));
    });
  };


  return (
    <>
      <NavLink to='/'>
        <button className="is-button ml-4">
          <i className="fa-solid fa-arrow-left px-6"></i>
        </button>
      </NavLink>

      <div className="container px-6">
        {course?.lessons.map((lesson: Lesson) => {
          const poster = lesson.status === 'locked'
            ? 'https://image.shutterstock.com/image-vector/lock-icon-260nw-425675884.jpg'
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg/1200px-YouTube_play_button_icon_%282013%E2%80%932017%29.svg.png'

          const videoJsOptions = {
            muted: false,
            crossorigin: true,
            autoplay: false,
            controls: !(lesson.status === 'locked'),
            responsive: true,
            fluid: true,
            poster: poster,
            sources: [{
              src: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
              type: 'application/x-mpegURL'
            }]
          };

          return (
            <div className="lesson pt-6">

              <h3 className="
                subtitle
                is-3
                has-text-centered
              ">
                {lesson.title}

              </h3>

              <div className="columns">
                <div className="column" id={`lesson-${lesson.order}`}>
                  <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                </div>

                <div className="column">
                  <p>
                    Order: {lesson.order}
                  </p>
                  <p>
                    Duration: {lesson.duration} min.
                  </p>
                  <p
                    className={classNames({ 'notification is-warning': lesson.status === 'locked' })}
                  >
                    Status: {lesson.status}
                  </p>
                  <h5 className="subtitle pt-4">Description:</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quaerat molestias. Eaque expedita, dolores inventore laborum ipsa harum cum laudantium placeat accusamus illo? Commodi optio tempora corporis, temporibus accusamus voluptates?
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}