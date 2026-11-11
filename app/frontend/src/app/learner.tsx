import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type LearnerState = {
  name: string;
  fields: string[];
  level: string;
  hours: number;
  goal: string;
  onboardingComplete: boolean;
  assessmentScore: number;
  completedTopics: string[];
};

const initialState: LearnerState = {
  name: "Alex",
  fields: ["Artificial Intelligence", "Data Science"],
  level: "Some experience",
  hours: 8,
  goal: "Become an AI Engineer",
  onboardingComplete: false,
  assessmentScore: 0,
  completedTopics: ["Python foundations", "Git essentials"],
};

type LearnerContextValue = {
  learner: LearnerState;
  updateLearner: (patch: Partial<LearnerState>) => void;
  toggleTopic: (topic: string) => void;
};

const LearnerContext = createContext<LearnerContextValue | null>(null);

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [learner, setLearner] = useState<LearnerState>(() => {
    try {
      const saved = localStorage.getItem("skillpath-learner");
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem("skillpath-learner", JSON.stringify(learner));
  }, [learner]);

  const updateLearner = (patch: Partial<LearnerState>) =>
    setLearner((current) => ({ ...current, ...patch }));

  const toggleTopic = (topic: string) =>
    setLearner((current) => ({
      ...current,
      completedTopics: current.completedTopics.includes(topic)
        ? current.completedTopics.filter((item) => item !== topic)
        : [...current.completedTopics, topic],
    }));

  return (
    <LearnerContext.Provider value={{ learner, updateLearner, toggleTopic }}>
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) throw new Error("useLearner must be used within LearnerProvider");
  return context;
}
