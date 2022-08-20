import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.min.css';
import NotFound from '@/pages/notFound/404';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import WebRoutes from './router/route';
import { BASE_PATH } from './router';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <Provider {...store}>
      <BrowserRouter basename={BASE_PATH}>
        <Routes>
          <Route path='/terminal/*' element={<WebRoutes />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  , root,
);
reportWebVitals();
