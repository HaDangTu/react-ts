import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import AppContextProvider from '../store/store';

export default function Root() {
  return (
    <AppContextProvider>
      <Header />
      <Outlet />
    </AppContextProvider>
  );
}
