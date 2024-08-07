import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { RouterPage } from './pages/router-page';
import { StoreLayout } from 'components/layouts/store.layout';
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StoreLayout>
          <RouterPage />
        </StoreLayout>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
