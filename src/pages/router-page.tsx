import {
  Route, Routes
} from 'react-router-dom';
import { ROUTES } from 'constants/routes';

export const RouterPage = () => {
  return (
    <Routes>
      {
        Object.keys(ROUTES).map(key => (
          <Route path={ROUTES[key].path} element={ROUTES[key].component} />
        ))
      }
    </Routes>
  );
};

