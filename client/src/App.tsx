import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TwitterBlue from './components/TwitterBlue'
import ProtectedRoute from './components/ProtectedRoute'
import {
  Bookmarks,
  Dashboard,
  Explore,
  Home,
  Messages,
  Notifications,
  Profile,
  Register,
} from './pages'
import {
  PersonalTweets,
  Replies,
  Media,
  Likes,
  ConnectedPeople,
  Followers,
  Following,
} from './components/ProfileContent'
import TweetStatus from './components/Tweets/TweetStatus'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
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
            <Route element={<ConnectedPeople />}>
              <Route path='/:userTag/followers' element={<Followers />} />
              <Route path='/:userTag/following' element={<Following />} />
            </Route>

            {/*  */}

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
