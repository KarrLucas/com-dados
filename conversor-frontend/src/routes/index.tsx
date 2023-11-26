import { Navigate, useRoutes } from 'react-router-dom';
import Upload from 'src/pages/upload/Upload';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Upload/>,
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}