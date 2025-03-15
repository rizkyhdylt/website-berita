import { useState } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import MainLayout from './dashboard/layout/MainLayout'
import AdminIndex from './dashboard/pages/AdminIndex'
import Login from './dashboard/pages/Login'
import ProtectDashboard from './middleware/ProtectDashboard'
import ProtectRole from './middleware/ProtectRole'
import Unable from './dashboard/pages/Unable'
import AddWriter from './dashboard/pages/AddWriter'
import Writers from './dashboard/pages/Writers'
import News from './dashboard/pages/News'
import Profile from './dashboard/pages/Profile'
import WriterIndex from './dashboard/pages/WriterIndex'
import CreateNews from './dashboard/pages/CreateNews'
import Edit_news from './dashboard/pages/Edit_news'
import LabelBerita from './dashboard/pages/LabelBerita'
import User from './dashboard/pages/User'
import Iklan from './dashboard/pages/Iklan'


function App() {
  // const [count, setCount] = useState(0)

    const userInfo = {
      role : "writer"
    }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<ProtectDashboard/>}>
            <Route path='' element={<MainLayout/>}>
            <Route path='' element={userInfo.role ==='admin'?<Navigate to='/dashboard/admin'/> : <Navigate to='/dashboard/writer'/>}/>
            <Route path='unable-access' element={<Unable/>}/>
            <Route path='news' element={<News/>}/>
            
            <Route path='profile' element={<Profile/>}/>

              <Route path="" element={<ProtectRole role="admin" />}>
                <Route path="admin" element={<AdminIndex />} />
                <Route path="writer/add" element={<AddWriter />} />
                <Route path="writers" element={<Writers />} />
                <Route path="labelberita" element={<LabelBerita/>} />
                <Route path="user" element={<User/>} />
                <Route path="iklan" element={<Iklan/>} />
              </Route>
            
              <Route path='' element={<ProtectRole role='writer'/>}>
                <Route path='/dashboard/writer' element={<WriterIndex/>}/>
                <Route path='news/create' element={<CreateNews/>}/>
                <Route path='news/edit/:news_id' element={<Edit_news/>}/>
              </Route>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
