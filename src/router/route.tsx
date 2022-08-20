import React, { useEffect } from 'react';
import NotFound from '@/pages/notFound/404';
import YuTerminal from '@/pages/yuTerminal';
import { Route, Routes } from 'react-router-dom';

const WebRoutes = () => {
  useEffect(() => {
    document.title = 'YuTerminal';
  }, []);
  return (
    <Routes>
      <Route path='/' element={<YuTerminal />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default WebRoutes;