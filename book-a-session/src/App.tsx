import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home.tsx';
import SessionsPage from './pages/Sessions.tsx';
import SessionPage from './pages/Session.tsx';
import Root from './pages/Root.tsx';
import { HOME_PATH, SESSIONS_PATH } from './utils/paths.ts';

const Router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: SESSIONS_PATH, element: <SessionsPage /> },
      { path: `${SESSIONS_PATH}/:id`, element: <SessionPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
