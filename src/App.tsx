import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Accounts, Roles, Classes, Courses, LessonDetails, Lessons} from './pages/index'
import Adminlayout from '@/layouts/Adminlayout'
import { ThemeProvider } from './context/ThemeContext'
import { Login } from '@/pages'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/roles"/>}/>

          <Route path="/admin" element={<Adminlayout/>}>
            <Route path="roles" element={<Roles/>}/>
            <Route path="accounts" element={<Accounts/>}/>
            <Route path="courses" element={<Courses/>}/>
            <Route path="classes" element={<Classes/>}/>
            <Route path="lessons" element={<Lessons/>}/>
            <Route path="lessondetails" element={<LessonDetails/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
