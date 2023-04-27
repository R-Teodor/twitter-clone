import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Messages from './components/Messages'
import Bookmarks from './components/Bookmarks'
import TwitterBlue from './components/TwitterBlue'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import {
  PersonalTweets,
  Replies,
  Media,
  Likes,
} from './components/ProfileContent'
import TweetStatus from './components/TweetStatus'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path='explore' element={<Explore />} />
            <Route
              path='notifications'
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path='messages'
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path='bookmarks'
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />

            <Route
              path='twitterBl'
              element={
                <ProtectedRoute>
                  <TwitterBlue />
                </ProtectedRoute>
              }
            />

            <Route
              path='profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>

            <Route path='/:userTag' element={<Profile />}>
              <Route index element={<PersonalTweets />} />
              <Route path='with_replies' element={<Replies />} />
              <Route path='media' element={<Media />} />
              <Route path='likes' element={<Likes />} />
            </Route>
            <Route path='/:userTag/status/:tweetId' element={<TweetStatus />} />
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
