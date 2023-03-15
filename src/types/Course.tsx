export interface Course {
  id: string,
  title: string,
  tags: string[],
  launchDate: string,
  status: string,
  description: string,
  duration: number,
  lessonsCount: number,
  containsLockedLessons: boolean,
  previewImageLink: string,
  rating: number,
  meta: Meta,
}

interface Meta {
  slug: string,
  skills: string[],
  courseVideoPreview: CourseVideoPreview,
}

interface CourseVideoPreview {
  link: string,
  duration: number,
  previewImageLink: string

}