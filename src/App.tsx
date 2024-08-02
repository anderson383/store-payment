import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom';
import { RouterPage } from './pages/router-page';
import { StoreLayout } from 'components/layouts/store.layout';
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StoreLayout>
          <RouterPage />
        </StoreLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
