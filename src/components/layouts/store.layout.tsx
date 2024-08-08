import { Header } from "../../components/features/header/Header"
import styles from './store.layout.module.scss';

interface StoreLayoutProps {
  children: React.ReactNode
}
export const StoreLayout:React.FC<StoreLayoutProps> = ({children}) => {

  return (
    <div className={styles.storeLayout}>
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}
