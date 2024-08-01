import ReactDOM from 'react-dom/client';
import  './index.scss';
import App from './App';
import { RepositoryIocProvider } from './services/services/config/context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RepositoryIocProvider>
    <App />
  </RepositoryIocProvider>
);