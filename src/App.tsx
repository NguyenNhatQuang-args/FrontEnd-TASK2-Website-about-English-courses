
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Accounts, Roles, Classes, Courses, LessonDetails, Lessons} from './pages/index'
import Adminlayout from '@/layouts/Adminlayout'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'
import { ROUTES } from '@/constants'
import {
  UserPage,
  SentenceBuilderPage,
  WorkBankPage,
} from '@/pages'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* public */}
        <Route path={ROUTES.HOME} element={<div>Home</div>} />
        <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
        <Route path={ROUTES.REGISTER} element={<div>Register</div>} />

        {/* user */}
        <Route path={ROUTES.USER} element={<UserPage />}>
          <Route
            path="lessons/:lessonId/sentence-builder"
            element={<SentenceBuilderPage />}
          />
          <Route
            path="lessons/:lessonId/work-bank"
            element={<WorkBankPage />}
          />
        </Route>
          <Route path="/" element={<Navigate to="/admin/roles"/>}/>
          
          <Route path="/admin" element={<Adminlayout/>}>
            <Route path="roles" element={<Roles/>}/>
            <Route path="accounts" element={<Accounts/>}/>
            <Route path="courses" element={<Courses/>}/>
            <Route path="classes" element={<Classes/>}/>
            <Route path="lessons" element={<Lessons/>}/>
            <Route path="lessondetails" element={<LessonDetails/>}/>
          </Route>
          
        </Routes>
        
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
