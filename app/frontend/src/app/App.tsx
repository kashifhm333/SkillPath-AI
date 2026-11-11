import { RouterProvider } from "react-router";
import { LearnerProvider } from "./learner";
import { router } from "./routes";

export default function App() {
  return (
    <LearnerProvider>
      <RouterProvider router={router} />
    </LearnerProvider>
  );
}
