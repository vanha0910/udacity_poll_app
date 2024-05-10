import ProtectedRoute from "../components/common/ProtectedRoute";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import { PATH } from "../constansts";
import LeaderBoard from "../components/pages/LeaderBoard";
import AddQuestion from "../components/pages/AddQuestion";
import NotFound from "../components/pages/NotFound";
import QuestionDetails from "../components/pages/QuestionDetails";

const router = [
  {
    path: PATH.HOME,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.LEADER_BOARD,
    element: (
      <ProtectedRoute>
        <LeaderBoard />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.NEW_QUESTION,
    element: (
      <ProtectedRoute>
        <AddQuestion />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.DETAILS,
    element: (
      <ProtectedRoute>
        <QuestionDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <NotFound />
      </ProtectedRoute>
    ),
  },
];

export default router;
