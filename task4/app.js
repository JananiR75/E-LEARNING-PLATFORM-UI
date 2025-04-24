const courses = {
  1: { 
      title: "AWS Fundamentals", 
      lessons: [
          { title: "Introduction to AWS", video: "https://youtu.be/Z3SYDTMP3ME?feature=shared", completed: false },
          { title: "EC2 Basics", video: "https://youtu.be/eaicwmnSdCs?feature=shared", completed: false },
          { title: "S3 Storage", video: "https://youtu.be/e6w9LwZJFIA?feature=shared", completed: false }
      ] 
  },
  2: { 
      title: "React Basics", 
      lessons: [
          { title: "Introduction to React", video: "https://youtu.be/Y6aYx_KKM7A?feature=shared", completed: false },
          { title: "Components in React", video: "https://youtu.be/Y2hgEGPzTZY?feature=shared", completed: false },
          { title: "State & Props", video: "https://youtu.be/4ORZ1GmjaMc?feature=shared", completed: false }
      ] 
  }
};

let currentCourseId;
let currentLessonIndex;

function showCourse(courseId) {
  currentCourseId = courseId;
  document.getElementById("home-page").style.display = "none";
  document.getElementById("course-details").style.display = "block";

  const course = courses[courseId];
  document.getElementById("course-title").innerText = course.title;

  const lessonList = document.getElementById("lesson-list");
  lessonList.innerHTML = "";

  course.lessons.forEach((lesson, index) => {
      const lessonItem = document.createElement("li");
      lessonItem.innerHTML = `<a href="#" onclick="showLesson(${courseId}, ${index})">${lesson.title} ${lesson.completed ? "✅" : ""}</a>`;
      lessonList.appendChild(lessonItem);
  });

  updateProgress(courseId);
}

function showLesson(courseId, lessonIndex) {
  currentLessonIndex = lessonIndex;
  document.getElementById("course-details").style.display = "none";
  document.getElementById("lesson-content").style.display = "block";

  const lesson = courses[courseId].lessons[lessonIndex];
  document.getElementById("lesson-title").innerText = lesson.title;
  document.getElementById("lesson-video").src = lesson.video;
}

function markLessonComplete() {
  const course = courses[currentCourseId];
  course.lessons[currentLessonIndex].completed = true;
  updateProgress(currentCourseId);
  goBackToCourse();
}

function updateProgress(courseId) {
  const course = courses[courseId];
  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const progressPercent = Math.round((completedLessons / course.lessons.length) * 100);

  document.getElementById(`progress-${courseId}`).innerText = `${progressPercent}%`;
  document.getElementById(`bar-${courseId}`).style.width = `${progressPercent}%`;
}

function goBack() {
  document.getElementById("course-details").style.display = "none";
  document.getElementById("home-page").style.display = "block";
}

function goBackToCourse() {
  document.getElementById("lesson-content").style.display = "none";
  document.getElementById("course-details").style.display = "block";
}
