import React, { FC, useRef } from "react";
import { Course, CourseShort } from "../../types/Course";
import { CoursePreview } from "../CoursePreview";
import { JsOptions } from "../../types/VideoJSOptions";

type Props = {
  courses: Course[],
}

export const Courses: FC<Props> = ({ courses }) => {
  const playerRef = useRef(null);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on("mouseover", function () {
      player.play();
      player.playbackRate(4);
    });
    player.on("mouseleave", function () {
      player.pause();
    });
  };

  return (
    <ul className='has-text-centered'>
      {courses.map(({
        id,
        title,
        lessonsCount,
        previewImageLink,
        rating,
        meta: {
          courseVideoPreview,
          slug,
          skills,
        }
      }: Course) => {
        const videoJsOptions: JsOptions = {
          muted: true,
          crossorigin: true,
          autoplay: false,
          controls: false,
          responsive: true,
          fluid: true,
          poster: false,
          sources: [{
            src: courseVideoPreview?.link,
            type: 'application/x-mpegURL'
          }]
        };

        const coursePreview: CourseShort = {
          title,
          lessonsCount,
          previewImageLink,
          rating,
          slug,
          skills,
        };

        return (
          <li
            key={id}
            className="
              has-text-info
              py-6
            ">
            <CoursePreview
              course={coursePreview}
              videoJsOptions={videoJsOptions}
              handlePlayerReady={handlePlayerReady}
            />
          </li>
        )
      })}
    </ul>
  )
}