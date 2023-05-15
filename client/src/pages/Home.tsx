import { useState } from 'react'
import { Link } from 'react-router-dom'
import TweetComponents from '../components/Tweets/TweetComponents'
import axios from 'axios'
import type { ReturnThread } from '../features/tweets/tweetSlice'
import TweetInputComponent from '../components/Tweets/TweetInputComponent'

type FeedState = 'For You' | 'Following'

// rgb(56, 68, 77) border color
const Home = () => {
  const [feedState, setFeedState] = useState<FeedState>('For You')
  const [tweetArray, setTweetArray] = useState<ReturnThread[]>([])

  const handleFeedRequest = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const newState = e.currentTarget.textContent as FeedState
    setFeedState(newState)
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/tweet/following',
      { withCredentials: true }
    )
    console.log(newState)
    setTweetArray(data)
  }

  const activeFeedState =
    'relative before:w-full  before:h-1 before:bg-[rgb(28,155,240)] before:absolute  before:-bottom-4 before:rounded-md font-bold text-white'

  const isData: boolean = false
  return (
    <>
      <div className='bg-[rgba(21, 32, 43, 0.75)] backdrop-blur-lg flex flex-col justify-between  w-full border-b-[1px] border-slate-500 border-opacity-40 sticky top-0'>
        <h1 className='font-bold text-xl py-3 pl-4'>Home</h1>
        <div className='flex w-full'>
          <Link
            to={'/'}
            className='font-2xl px-6 py-4 flex-grow hover:bg-[rgba(247,249,249,0.09)] text-center duration-200 text-[rgb(139,152,165)]'
            onClick={handleFeedRequest}
          >
            <span className={feedState === 'For You' ? activeFeedState : ''}>
              For You
            </span>
          </Link>
          <Link
            to={'/'}
            className='font-2xl px-6 py-4 flex-grow hover:bg-[rgba(247,249,249,0.09)] text-center duration-100 text-[rgb(139,152,165)]'
            onClick={handleFeedRequest}
          >
            <span className={feedState === 'Following' ? activeFeedState : ''}>
              Following
            </span>
          </Link>
        </div>
      </div>
      <div className='flex flex-col w-full '>
        <div className='border-b-[1px] border-slate-500 border-opacity-40'>
          <TweetInputComponent componentType='Tweet' />
        </div>

        <main>
          {isData && (
            <div className='text-center text-l py-4  border-b-[1px] border-slate-500 border-opacity-40 hover:bg-[rgba(247,249,249,0.03)] duration-150'>
              Tweets
            </div>
          )}
          {/* {userTweets &&
            userTweets
              .map((item, index) => <div key={index}>{item.content}</div>)
              .reverse()} */}

          {feedState == 'Following' &&
            tweetArray &&
            tweetArray.map((item, index) => (
              <TweetComponents tweet={item} key={item._id} />
            ))}

          {feedState == 'For You' && (
            <div className='flex flex-col justify-center items-center pt-6'>
              <div className='max-w-[360px]'>
                <h1 className='font-bold text-3xl'>Welcome to Twitter!</h1>
                <p className='max-w-[40ch] pt-2 text-[rgb(139,152,165)] '>
                  This is the best place to see what’s happening in your world.
                  Find some people and topics to follow now.
                </p>
              </div>
              <div className='pt-4 w-[360px]'>
                <div className='flex justify-start'>
                  <button className=' py-3 px-8 block bg-[#1D9BF0] text-center font-bold text-lg rounded-3xl'>
                    Let's Go
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
export default Home
