import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Loading from './Components/Loading';
import Error from './Error';
const Weather = lazy(() => import('./Components/Weather'));


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
    <Route
          path='/'
          element={
            <Suspense fallback={<Loading/>}>
              <Weather/>
            </Suspense>
          }
        />
      <Route path="/error" element={<Error/>} /> 
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)