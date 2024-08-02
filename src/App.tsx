import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom';
import { RouterPage } from './pages/router-page';
import { StoreLayout } from 'components/layouts/store.layout';

function App() {
  return (
    <BrowserRouter>
      <StoreLayout>
        <RouterPage />
      </StoreLayout>
    </BrowserRouter>
  );
}

export default App;
