import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App.js';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/?fromDate_=:fromDate_&toDate_=:toDate_" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
