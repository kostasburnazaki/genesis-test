import React, { FC } from "react";
import { VideoJS } from "../Player";
import { Skills } from "../Skills";
import { NavLink } from "react-router-dom";
import { CourseShort } from "../../types/Course";
import { JsOptions } from "../../types/VideoJSOptions";

type Props = {
  course: CourseShort,
  videoJsOptions: JsOptions,
  handlePlayerReady: (player: any) => void,
}

export const CoursePreview: FC<Props> = (
  { course: {
    title,
    lessonsCount,
    previewImageLink,
    rating,
    slug,
    skills,
  },
    videoJsOptions,
    handlePlayerReady,
  }
) => {
  return (
    <div className="container px-6">
      <figure className='image'>
        <img src={previewImageLink + '/cover.webp'} alt="Course preview" />
      </figure>

      <h2 className="
                subtitle
                has-text-info
                has-text-weight-bold
                is-uppercase
                is-underlined
              ">
        {title}
      </h2>

      <div className="columns">
        <div className="column">
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>

        <div className="
                  column
                  columns
                  is-flex
                  is-justify-content-space-between
                  is-flex-direction-column
                  ">
          <div className="column">
            <h3 className="
                      is-size-5
                      is-uppercase
                      has-text-weight-semibold
                    ">
              Skills to acquire:
            </h3>

            <Skills skills={skills} />
          </div>

          <div className="column">
            <button className="is-button is-link">
              <NavLink
                to={`/${slug}`}
              >
                <h2 className="
                          subtitle
                          has-text-info
                          has-text-weight-bold
                          is-capitilized
                        ">
                  Details
                </h2>
              </NavLink>
            </button>
          </div>
        </div>

        <div className="
                  column columns
                  is-flex
                  is-justify-content-space-between
                  is-flex-direction-column
                  py-6
                ">
          <p className="
                    is-size-5
                    is-uppercase
                    has-text-weight-semibold
                  ">
            {lessonsCount} lessons
          </p>

          <p className="
                    is-size-5
                    is-uppercase
                    has-text-weight-semibold
                    is-italic
                  ">
            Rating: {rating}
          </p>
        </div>
      </div>
    </div>
  )
}