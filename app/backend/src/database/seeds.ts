import bcrypt from "bcryptjs";

export type StageStatus = "in_progress" | "up_next" | "locked" | "completed";
export type TopicStatus = "mastered" | "active" | "locked";

export interface TopicItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: TopicStatus;
  completed: boolean;
  time: string;
  videoDuration: string;
  content: string;
  codeSnippet: string;
}

export interface StageItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  progress: number;
  duration: string;
  status: StageStatus;
  topics: TopicItem[];
}

export async function getDefaultSeeds() {
  const defaultPasswordHash = await bcrypt.hash("Password123!", 10);

  const defaultUser = {
    id: "usr_alex_morgan",
    email: "alex@example.com",
    name: "Alex Morgan",
    passwordHash: defaultPasswordHash,
    role: "learner" as const,
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z",
  };

  const defaultProfile = {
    userId: "usr_alex_morgan",
    goal: "Become an AI Engineer",
    fields: ["Artificial Intelligence", "Data Science"],
    level: "Some experience",
    hours: 8,
    learningStyle: "Mixed",
    language: "English",
    ecosystem: "Cloud agnostic",
    operatingSystem: "Linux",
    onboardingComplete: true,
    assessmentScore: 78,
    streakDays: 12,
    lastActiveDate: new Date().toISOString().split("T")[0],
    weeklyMinutes: 275, // 4h 35m
    roleReadinessPercent: 31,
  };

  const defaultStages: StageItem[] = [
    {
      id: "foundations",
      number: "01",
      title: "Strong foundations",
      subtitle: "Build the baseline needed for applied AI",
      progress: 68,
      duration: "3–4 weeks",
      status: "in_progress" as const,
      topics: [
        {
          id: "top_py_foundations",
          slug: "python-foundations",
          title: "Python foundations",
          subtitle: "Core syntax, data structures, and functional idioms",
          status: "mastered" as const,
          completed: true,
          time: "4h 20m",
          videoDuration: "6:15",
          content: "Master Python fundamentals essential for production machine learning systems, including memory layouts, list comprehensions, and generators.",
          codeSnippet: "skills = {'python': 0.82, 'sql': 0.64}\nskills['ml'] = 0.71\nprint(skills.get('python')) # 0.82",
        },
        {
          id: "top_git_essentials",
          slug: "git-essentials",
          title: "Git essentials",
          subtitle: "Branching strategies, interactive rebasing, and atomic commits",
          status: "mastered" as const,
          completed: true,
          time: "2h 10m",
          videoDuration: "3:40",
          content: "Learn professional git workflows, pull request hygiene, and versioning for machine learning models and codebases.",
          codeSnippet: "git checkout -b feature/model-pipeline\ngit commit -m 'feat: add vector embeddings stage'\ngit rebase -i main",
        },
        {
          id: "top_hash_maps",
          slug: "hash-maps",
          title: "Hash maps: lookups and trade-offs",
          subtitle: "Hash collisions, amortized complexity, and dictionary internals",
          status: "active" as const,
          completed: false,
          time: "5h 40m",
          videoDuration: "4:32",
          content: "Hash maps trade a little memory for remarkably fast lookups. They use a deterministic hash function to map keys to bucket indices, providing O(1) average lookup and insertion.",
          codeSnippet: "lookup_table = {}\ndef cache_embedding(token_id, vector):\n    lookup_table[token_id] = vector\n    return lookup_table.get(token_id)",
        },
        {
          id: "top_linear_algebra",
          slug: "linear-algebra-essentials",
          title: "Linear algebra essentials",
          subtitle: "Vectors, dot products, matrices, and tensor transformations",
          status: "locked" as const,
          completed: false,
          time: "4h 15m",
          videoDuration: "5:50",
          content: "Understand vector spaces, cosine similarity, and matrix multiplication underlying modern neural networks and attention mechanisms.",
          codeSnippet: "import numpy as np\nv1 = np.array([0.1, 0.9, -0.4])\nv2 = np.array([0.2, 0.8, -0.1])\nsimilarity = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))",
        },
      ],
    },
    {
      id: "core",
      number: "02",
      title: "Core machine learning",
      subtitle: "Learn to train, evaluate, and improve models",
      progress: 18,
      duration: "6–8 weeks",
      status: "up_next" as const,
      topics: [
        {
          id: "top_pandas_prep",
          slug: "data-prep-pandas",
          title: "Data preparation with Pandas",
          subtitle: "Data cleaning, feature engineering, and outlier detection",
          status: "active" as const,
          completed: false,
          time: "6h 00m",
          videoDuration: "7:10",
          content: "Transform messy real-world datasets into clean, robust tensors ready for supervised learning models.",
          codeSnippet: "import pandas as pd\ndf = pd.read_csv('dataset.csv')\ndf_clean = df.dropna().assign(norm_val=lambda x: (x.val - x.val.mean()) / x.val.std())",
        },
        {
          id: "top_supervised",
          slug: "supervised-learning",
          title: "Supervised learning",
          subtitle: "Regression, classification, loss functions, and gradient descent",
          status: "locked" as const,
          completed: false,
          time: "9h 00m",
          videoDuration: "8:20",
          content: "Train and evaluate linear models, decision trees, and ensemble methods using scikit-learn.",
          codeSnippet: "from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)",
        },
        {
          id: "top_model_eval",
          slug: "model-evaluation",
          title: "Model evaluation & validation",
          subtitle: "ROC-AUC, cross-validation, precision-recall trade-offs",
          status: "locked" as const,
          completed: false,
          time: "5h 00m",
          videoDuration: "5:00",
          content: "Avoid data leakage, tune hyperparameters systematically, and measure generalizability.",
          codeSnippet: "from sklearn.metrics import classification_report\nprint(classification_report(y_test, predictions))",
        },
      ],
    },
    {
      id: "specialization",
      number: "03",
      title: "AI engineering specialization",
      subtitle: "Move from models to production AI systems",
      progress: 0,
      duration: "8–10 weeks",
      status: "locked" as const,
      topics: [
        {
          id: "top_deep_learning",
          slug: "deep-learning-systems",
          title: "Deep learning systems",
          subtitle: "PyTorch, backpropagation, and multilayer perceptrons",
          status: "locked" as const,
          completed: false,
          time: "12h 00m",
          videoDuration: "10:15",
          content: "Construct neural networks from scratch and understand loss landscapes and optimization techniques.",
          codeSnippet: "import torch\nimport torch.nn as nn\nmodel = nn.Sequential(nn.Linear(128, 64), nn.ReLU(), nn.Linear(64, 10))",
        },
        {
          id: "top_llm_systems",
          slug: "large-language-models",
          title: "Large language models",
          subtitle: "Transformer architectures, embeddings, and context caching",
          status: "locked" as const,
          completed: false,
          time: "10h 00m",
          videoDuration: "9:30",
          content: "Learn how decoder-only transformers work, how tokenization works, and how to query model APIs robustly.",
          codeSnippet: "from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(model='gpt-4o', messages=[{'role': 'user', 'content': 'Explain RAG'}])",
        },
        {
          id: "top_mlops",
          slug: "mlops-deployment",
          title: "MLOps & deployment",
          subtitle: "Docker containerization, model monitoring, and latency budgets",
          status: "locked" as const,
          completed: false,
          time: "8h 00m",
          videoDuration: "6:45",
          content: "Package models into low-latency REST and gRPC microservices with automated healthchecks.",
          codeSnippet: "FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ['uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000']",
        },
      ],
    },
    {
      id: "capstone",
      number: "04",
      title: "Portfolio capstone",
      subtitle: "Demonstrate job-ready skills with evidence",
      progress: 0,
      duration: "3–4 weeks",
      status: "locked" as const,
      topics: [
        {
          id: "top_rag_capstone",
          slug: "rag-assistant-capstone",
          title: "Build a production RAG assistant",
          subtitle: "Hybrid search, chunking strategies, and reranking pipeline",
          status: "locked" as const,
          completed: false,
          time: "24h 00m",
          videoDuration: "12:00",
          content: "Design, build, and deploy an end-to-end Retrieval-Augmented Generation system with vector stores and semantic evaluation.",
          codeSnippet: "# Complete end-to-end multi-source hybrid search and reranking\nretrieved = hybrid_search(query, top_k=20)\nreranked = cross_encoder_rerank(query, retrieved, top_n=5)",
        },
      ],
    },
  ];

  const defaultQuestions = [
    {
      id: "q_1",
      topic: "Python",
      question: "Which structure provides average O(1) key lookup in Python?",
      options: ["List", "Dictionary", "Tuple", "Generator"],
      correctAnswer: 1,
      explanation: "Python dictionaries use an optimized hash table under the hood, yielding O(1) average lookup time.",
    },
    {
      id: "q_2",
      topic: "Machine learning",
      question: "What is the primary purpose of a validation dataset?",
      options: ["Train model weights", "Tune hyperparameters and assess generalization", "Store raw data permanently", "Deploy the model directly to production"],
      correctAnswer: 1,
      explanation: "Validation datasets prevent overfitting on training data by offering an unbiased evaluation while tuning hyperparameters.",
    },
    {
      id: "q_3",
      topic: "Statistics",
      question: "Which metric is least affected by extreme outliers in a distribution?",
      options: ["Mean", "Range", "Median", "Variance"],
      correctAnswer: 2,
      explanation: "The median represents the central 50th percentile rank and is mathematically robust against extreme skew and outliers.",
    },
    {
      id: "q_4",
      topic: "Data Engineering",
      question: "In relational databases, which index structure is typically used for range and equality queries?",
      options: ["B-Tree", "Linked List", "Bloom Filter", "Bitset"],
      correctAnswer: 0,
      explanation: "B-Trees balance tree height and optimize disk I/O, supporting logarithmic equality and sequential range scans.",
    },
  ];

  const defaultPracticeItems = [
    {
      id: "prac_1",
      userId: "usr_alex_morgan",
      topic: "Python",
      title: "Python list comprehensions & generators",
      status: "Needs review",
      memoryStrength: 64,
      lastReviewed: "2026-03-08T10:00:00.000Z",
      dueToday: true,
    },
    {
      id: "prac_2",
      userId: "usr_alex_morgan",
      topic: "Databases",
      title: "SQL joins and aggregation indexing",
      status: "Strengthening",
      memoryStrength: 72,
      lastReviewed: "2026-03-09T14:30:00.000Z",
      dueToday: false,
    },
    {
      id: "prac_3",
      userId: "usr_alex_morgan",
      topic: "Version Control",
      title: "Git branching and conflict resolution",
      status: "Mastered",
      memoryStrength: 91,
      lastReviewed: "2026-03-10T09:15:00.000Z",
      dueToday: false,
    },
  ];

  const defaultProjects = [
    {
      id: "proj_data_analyzer",
      title: "Build a data quality analyzer",
      subtitle: "Create a CLI tool that profiles CSV datasets, detects quality anomalies, and generates structured reports.",
      category: "Foundation Project",
      difficulty: "Intermediate",
      estimatedHours: "6–8 hours",
      status: "available",
      isCapstone: false,
      competencies: ["Python", "Data structures", "Testing"],
      rubricCriteria: ["Dataset schema inference", "Null and anomaly detection", "Unit test coverage > 80%", "Markdown report output"],
    },
    {
      id: "proj_weather_api",
      title: "API-powered weather service",
      subtitle: "Build a resilient REST service consuming multiple weather APIs with Redis caching and graceful fallback.",
      category: "Integration Project",
      difficulty: "Beginner",
      estimatedHours: "4–6 hours",
      status: "available",
      isCapstone: false,
      competencies: ["FastAPI", "HTTP clients", "Error handling"],
      rubricCriteria: ["Clean REST contracts", "Resilient timeouts", "Cache hit optimization"],
    },
    {
      id: "proj_churn_model",
      title: "Customer churn prediction pipeline",
      subtitle: "End-to-end classification model evaluating churn probability with feature importance and SHAP analysis.",
      category: "Machine Learning",
      difficulty: "Intermediate",
      estimatedHours: "8–10 hours",
      status: "available",
      isCapstone: false,
      competencies: ["Pandas", "Scikit-Learn", "SHAP"],
      rubricCriteria: ["Feature preprocessing pipeline", "Cross-validation", "Model interpretability artifacts"],
    },
    {
      id: "proj_rag_assistant",
      title: "Production RAG assistant",
      subtitle: "Demonstrate enterprise retrieval augmented generation with multi-modal vector search and latency telemetry.",
      category: "Capstone",
      difficulty: "Advanced",
      estimatedHours: "20–24 hours",
      status: "locked",
      isCapstone: true,
      competencies: ["LLMs", "Vector DB", "Docker", "FastAPI"],
      rubricCriteria: ["Chunking & Hybrid Search", "Hallucination mitigation evaluation", "Docker containerization with health checks"],
    },
  ];

  const defaultResources = [
    {
      id: "res_1",
      type: "Video",
      title: "Hash Tables & Collision Resolution — CS50",
      source: "Harvard University",
      time: "18 min",
      rating: "4.9",
      url: "https://cs50.harvard.edu",
      tags: ["Data structures", "Foundations"],
      saved: true,
    },
    {
      id: "res_2",
      type: "Documentation",
      title: "Python Dictionaries & Internal Hash Implementation",
      source: "Python.org",
      time: "12 min",
      rating: "4.8",
      url: "https://docs.python.org/3/tutorial/datastructures.html",
      tags: ["Python", "Documentation"],
      saved: false,
    },
    {
      id: "res_3",
      type: "Interactive",
      title: "Visualizing Hash Functions and Bucket Collisions",
      source: "VisuAlgo",
      time: "15 min",
      rating: "4.7",
      url: "https://visualgo.net/en/hashtable",
      tags: ["Interactive", "Algorithms"],
      saved: true,
    },
    {
      id: "res_4",
      type: "Article",
      title: "Hash Maps in High-Throughput Production Systems",
      source: "Engineering Notes",
      time: "9 min",
      rating: "4.6",
      url: "https://engineering.example.com/hash-maps",
      tags: ["System Design", "Performance"],
      saved: false,
    },
  ];

  const defaultMilestones = [
    {
      id: "ms_1",
      userId: "usr_alex_morgan",
      targetDate: "Mar 28",
      title: "Complete programming foundations",
      progress: 68,
      status: "In progress",
    },
    {
      id: "ms_2",
      userId: "usr_alex_morgan",
      targetDate: "May 15",
      title: "Build and evaluate first ML model",
      progress: 18,
      status: "Upcoming",
    },
    {
      id: "ms_3",
      userId: "usr_alex_morgan",
      targetDate: "Aug 01",
      title: "Deploy an AI microservice to production",
      progress: 0,
      status: "Upcoming",
    },
    {
      id: "ms_4",
      userId: "usr_alex_morgan",
      targetDate: "Oct 20",
      title: "Publish capstone portfolio & achieve role readiness",
      progress: 0,
      status: "Goal",
    },
  ];

  const defaultNotifications = [
    {
      id: "notif_1",
      userId: "usr_alex_morgan",
      title: "Review ready",
      description: "Python list comprehensions is due for a quick spaced-repetition review.",
      timestamp: "10 min ago",
      tone: "blue" as const,
      unread: true,
    },
    {
      id: "notif_2",
      userId: "usr_alex_morgan",
      title: "Your roadmap was adapted",
      description: "We moved model evaluation earlier based on your diagnostic answers.",
      timestamp: "2 hours ago",
      tone: "purple" as const,
      unread: true,
    },
    {
      id: "notif_3",
      userId: "usr_alex_morgan",
      title: "New skill mastered",
      description: "You demonstrated mastery in Git essentials.",
      timestamp: "Yesterday",
      tone: "green" as const,
      unread: false,
    },
    {
      id: "notif_4",
      userId: "usr_alex_morgan",
      title: "New project feedback",
      description: "Your data analyzer rubric has been reviewed with passing score.",
      timestamp: "Monday",
      tone: "amber" as const,
      unread: false,
    },
  ];

  return {
    users: [defaultUser],
    profiles: [defaultProfile],
    stages: defaultStages,
    questions: defaultQuestions,
    practiceItems: defaultPracticeItems,
    projects: defaultProjects,
    resources: defaultResources,
    milestones: defaultMilestones,
    notifications: defaultNotifications,
  };
}
