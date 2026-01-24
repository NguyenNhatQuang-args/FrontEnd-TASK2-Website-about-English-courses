import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants'

import {
  UserPage,
  SentenceBuilderPage,
  WorkBankPage,
} from '@/pages'

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
