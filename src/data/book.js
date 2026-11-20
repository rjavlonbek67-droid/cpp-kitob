import { curriculum } from "./curriculum.js";

export const book = {
  title: "C++ interaktiv kitob",
  chapters: curriculum,
};

const REQUIRED = ["analogy", "rules", "examples", "memory", "mistakes", "quiz"];

for (const chapter of book.chapters) {
  if (!chapter.lessons?.length) {
    throw new Error(`${chapter.id} bo'limi bo'sh`);
  }
  for (const lesson of chapter.lessons) {
    for (const key of REQUIRED) {
      if (!lesson[key]) {
        throw new Error(`${lesson.id} da "${key}" yo'q`);
      }
    }
    if (lesson.examples.length < 2) {
      throw new Error(`${lesson.id} da kamida 2 ta misol bo'lishi kerak`);
    }
    if (lesson.quiz.length < 2) {
      throw new Error(`${lesson.id} da kamida 2 ta savol bo'lishi kerak`);
    }
  }
}

export function findLesson(lessonId) {
  for (const chapter of book.chapters) {
    const lesson = chapter.lessons.find((item) => item.id === lessonId);
    if (lesson) return { chapter, lesson };
  }
  return null;
}

export function lessonNeighbors(lessonId) {
  const flat = book.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ chapter, lesson }))
  );
  const index = flat.findIndex((item) => item.lesson.id === lessonId);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : null,
  };
}
