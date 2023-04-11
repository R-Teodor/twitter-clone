import Dashboard from './pages/Dashboard'
import Home from './components/Home'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Explore from './components/Explore'
import Notifications from './components/Notifications'
import Messages from './components/Messages'
import Bookmarks from './components/Bookmarks'
import TwitterBlue from './components/TwitterBlue'
import Profile from './components/Profile'
import Register from './pages/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path='explore' element={<Explore />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='messages' element={<Messages />} />
            <Route path='bookmarks' element={<Bookmarks />} />
            <Route path='twitterBl' element={<TwitterBlue />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/:userTag' element={<Profile />} />
          </Route>
          <Route path='/login' element={<Register />} />
          <Route
            path='*'
            element={
              <div className='text-3xl text-white'>
                <Link to={'/'}>Not Bueno Amigo</Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
