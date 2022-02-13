import 'antd/dist/antd.min.css';
import './index.css';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import Header from './components/Header/Header';
import Preloader from './components/common/Preloader/Preloader';
import SearchFC from './components/Search/Search';
import { Favorite } from './components/Favorite/Favorite';

export default function App() {
  const { initializeApp } = useActions();
  const { AppIsInitialization } = useTypedSelector((state) => state.app);
  const { isAuth } = useTypedSelector((state) => state.user);

  useEffect(() => {
    initializeApp();
  }, []);

  if (AppIsInitialization) {
    return <Preloader />;
  }
  if (!isAuth) {
    return <Login />;
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/search" element={<SearchFC />} />
        <Route path="*" element={<Navigate replace to="/search" />} />
      </Routes>
    </div>
  );
}
