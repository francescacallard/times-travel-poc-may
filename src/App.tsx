import React from 'react'
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route
} from 'react-router-dom'
import { Routes } from 'routes/constants'
import { AppProvider } from 'AppContext'
import { DurationProvider } from 'context/Duration'

import Index from 'routes/Index'
import 'App.css'

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
    <DurationProvider>
      <ReactRoutes>
        <Route path={Routes.Index} element={<Index />}/>
      </ReactRoutes>
      </DurationProvider>
    </AppProvider>
  </BrowserRouter>
)

export default App
