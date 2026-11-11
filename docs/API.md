# SkillPath AI — REST API Specifications

Base URL: `/api` (or `http://localhost:4000/api`)

All responses adhere to the standard JSON response envelope:
```json
// Success Response
{
  "success": true,
  "data": { ... }
}

// Error Response
{
  "success": false,
  "error": {
    "message": "Human-readable error description",
    "details": [ ... ]
  },
  "correlationId": "uuid"
}
```

---

## 1. Authentication & Profile (`/api/auth`)

### `POST /api/auth/register`
Creates a new learner account.
- **Request Body**:
  ```json
  {
    "name": "Alex Morgan",
    "email": "alex@example.com",
    "password": "Password123!",
    "goal": "Become an AI Engineer",
    "fields": ["Artificial Intelligence", "Data Science"]
  }
  ```
- **Response**: `201 Created`
  Returns user object, initial profile, and JWT token (also set in `HttpOnly` cookie).

### `POST /api/auth/login`
Authenticates an existing user.
- **Request Body**:
  ```json
  {
    "email": "alex@example.com",
    "password": "Password123!"
  }
  ```
- **Response**: `200 OK`

### `POST /api/auth/logout`
Clears session cookie and invalidates client credentials.
- **Response**: `200 OK`

### `GET /api/auth/me`
Fetches authenticated user profile. Requires Bearer Token or session cookie.
- **Response**: `200 OK`

### `PATCH /api/auth/profile`
Updates learning preferences, goals, and weekly hour commitment.
- **Request Body**:
  ```json
  {
    "name": "Alex Morgan",
    "goal": "Senior AI Systems Architect",
    "hours": 10,
    "learningStyle": "Hands-on",
    "operatingSystem": "Linux"
  }
  ```

---

## 2. Roadmap & Stages (`/api/roadmap`)

### `GET /api/roadmap`
Retrieves entire roadmap curriculum, stage statuses, and overall progress.

### `GET /api/roadmap/stages/:stageId`
Retrieves specific stage details (e.g., `foundations`, `core`, `specialization`, `capstone`).

### `GET /api/roadmap/topics/:topicId`
Fetches topic lesson text, video metadata, code snippet, and mastery status.

### `POST /api/roadmap/topics/:topicId/toggle`
Toggles mastery/completion of a topic. Automatically recalculates stage progress and unlocks subsequent stages.
- **Request Body**: `{ "completed": true }`

### `POST /api/roadmap/adapt`
Triggers adaptive plan recalculation based on recent assessments and diagnostic telemetry.

---

## 3. Diagnostic Assessment (`/api/assessment`)

### `GET /api/assessment/questions`
Fetches diagnostic question pool with anti-cheat protection (correct answers withheld).

### `POST /api/assessment/submit`
Submits chosen options and evaluates baseline skill gaps.
- **Request Body**: `{ "answers": [1, 1, 2, 0] }`
- **Response**: `200 OK` with percentage score, question explanations, and personalized recommendation.

---

## 4. Practice & Spaced Repetition (`/api/practice`)

### `GET /api/practice`
Returns active recall review items with calculated memory strength percentages.

### `POST /api/practice/:id/review`
Submits an active practice review. Updates memory strength and schedules next retention interval.

### `POST /api/practice/start-session`
Initializes a smart review session with priority retention algorithms.

---

## 5. Projects & Portfolio (`/api/projects`)

### `GET /api/projects`
Retrieves portfolio briefs and rubric criteria.

### `POST /api/projects/:id/submit`
Submits GitHub repository or live URL for rubric assessment.
- **Request Body**:
  ```json
  {
    "submissionUrl": "https://github.com/alexmorgan/data-analyzer",
    "notes": "Includes comprehensive pytest suite and Dockerfile."
  }
  ```

---

## 6. Resources Explorer (`/api/resources`)

### `GET /api/resources?filter=Videos&search=hash`
Filters and searches curated resources.

### `POST /api/resources/:id/toggle-save`
Toggles bookmark status on a curated resource.

---

## 7. Analytics & Goals (`/api/analytics`, `/api/goals`)

### `GET /api/analytics`
Aggregates study time, weekly histogram data, and competency scores.

### `GET /api/goals`
Retrieves primary milestone targets and completion deadlines.

### `POST /api/goals/milestones`
Creates a custom milestone checkpoint.

---

## 8. Notifications (`/api/notifications`)

### `GET /api/notifications`
Retrieves notification feed with unread count.

### `POST /api/notifications/mark-all-read`
Marks all notifications as read.
