import { db } from "../../database/db.js";
import { BadRequestError } from "../../common/errors.js";

export class AssessmentService {
  public async getQuestions() {
    const dataStore = db.getData();
    // Anti-cheat: strip correctAnswer from client payload
    return dataStore.questions.map((q) => ({
      id: q.id,
      topic: q.topic,
      question: q.question,
      options: q.options,
    }));
  }

  public async submitAssessment(userId: string | undefined, answers: number[]) {
    const dataStore = db.getData();
    const questions = dataStore.questions;

    if (!Array.isArray(answers) || answers.length !== questions.length) {
      throw new BadRequestError(`Expected ${questions.length} answers, received ${answers?.length || 0}`);
    }

    let correctCount = 0;
    const reviewDetails = questions.map((q, idx) => {
      const isCorrect = answers[idx] === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        id: q.id,
        topic: q.topic,
        question: q.question,
        selectedOption: answers[idx],
        correctOption: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    // Update profile if authenticated
    if (userId) {
      const profile = dataStore.profiles.find((p) => p.userId === userId);
      if (profile) {
        profile.assessmentScore = scorePercentage;
        profile.roleReadinessPercent = Math.min(100, Math.round(scorePercentage * 0.4 + 20));
        await db.persist();
      }
    }

    return {
      scorePercentage,
      totalQuestions: questions.length,
      correctCount,
      passed: scorePercentage >= 70,
      details: reviewDetails,
      recommendation:
        scorePercentage >= 75
          ? "Strong foundation verified! Accelerating directly to applied model evaluation and vector search."
          : "Focused review recommended on core data structures and statistical distributions.",
    };
  }
}

export const assessmentService = new AssessmentService();
