import { IndexPage } from '../pages/index';
import { DetailPage } from '../pages/detail/detail';

export const ROUTES:Record<string, {path: string, component: React.ReactNode}> = {
  index: {
    path: '/',
    component: <IndexPage />
  },
  detailproduct: {
    path: '/detail/:id',
    component: <DetailPage />
  }
}