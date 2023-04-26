import { useState } from 'react'
import { Link } from 'react-router-dom'
import TweetComponents, { TweetObj } from '../components/TweetComponents'
import { HiGif, HiCalendar, HiPhoto } from 'react-icons/hi2'
import { HiEmojiHappy, HiChartBar, HiLocationMarker } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { createTweetThread } from '../features/tweets/tweetSlice'
import axios from 'axios'
import type { ReturnThread } from '../features/tweets/tweetSlice'

type FeedState = 'For You' | 'Following'

const tweet: TweetObj = {
  userName: 'Bahjeera',
  userTag: '@Bah_jera',
  verified: true,
  date: 'Mar 15',
  tweetContent: {
    text: 'It a nice life to be in the cyber security scene',
    img: '/src/assets/cyber-bg.png',
  },
  comments: '124k',
  retweets: '22k',
  likes: '80k',
  views: 17345,
}

const tweet2: TweetObj = {
  userName: 'Bartholomeo',
  userTag: '@Bart_holo_meo00',
  verified: true,
  date: 'Mar 18',
  tweetContent: {
    text: 'Second Twweet display',
    img: 'https://placehold.co/600x400',
  },
  comments: '324k',
  retweets: '122k',
  likes: '40k',
  views: 112345,
}

// rgb(56, 68, 77) border color
const Home = () => {
  const [feedState, setFeedState] = useState<FeedState>('For You')
  const [tweetData, setTweetData] = useState<TweetObj>(tweet)
  const [tweetArray, setTweetArray] = useState<ReturnThread[]>([])
  const [textareaField, setTextareaField] = useState('')

  const userTweets = useSelector(
    (state: RootState) => state.tweet.personalTweets
  )
  const dispatch = useDispatch<AppDispatch>()

  const handleFeedState = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const newState = e.currentTarget.textContent as FeedState
    setFeedState(newState)
    if (newState === 'Following') {
      setTweetData(tweet2)
    }
    if (newState === 'For You') {
      setTweetData(tweet)
    }
  }

  const handleFeedRequest = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const newState = e.currentTarget.textContent as FeedState
    setFeedState(newState)
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/tweet/following',
      { withCredentials: true }
    )
    console.log(data)
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
            onClick={handleFeedState}
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
      <div className='flex flex-col w-full'>
        <header className='flex flex-col w-full py-3 pb-2 border-b-[1px] border-slate-500 border-opacity-40'>
          <div className='px-3  flex gap-5'>
            <div className='w-12 h-12 overflow-hidden rounded-full'>
              <img
                src='https://placehold.co/100x100'
                alt=''
                className='w-full object-contain object-center'
              />
            </div>
            <textarea
              // type='textarea'
              placeholder="What's happening"
              className='text-2xl bg-transparent outline-none flex-grow flex-shrink-0 resize-none '
              rows={2}
              maxLength={245}
              value={textareaField}
              onChange={(e) => setTextareaField(e.target.value)}
            />
          </div>
          <div className='flex justify-between pr-5 pl-20'>
            <nav className='flex gap-4 text-blue-400'>
              <span>
                <HiPhoto size={20} />
              </span>
              <span>
                <HiGif size={20} />
              </span>
              <span>
                <HiChartBar size={20} />
              </span>
              <span>
                <HiEmojiHappy size={20} />
              </span>
              <span>
                <HiCalendar size={20} />
              </span>
              <span>
                <HiLocationMarker size={20} />
              </span>
            </nav>
            <button
              className='bg-[#1D9BF0] font-bold rounded-3xl py-1.5 px-4'
              onClick={() =>
                dispatch(createTweetThread({ content: textareaField }))
              }
            >
              Tweet
            </button>
          </div>
        </header>
        <main>
          {isData && (
            <div className='text-center text-l py-4  border-b-[1px] border-slate-500 border-opacity-40 hover:bg-[rgba(247,249,249,0.03)] duration-150'>
              Tweets
            </div>
          )}
          {userTweets &&
            userTweets
              .map((item, index) => <div key={index}>{item.content}</div>)
              .reverse()}

          {tweetArray &&
            tweetArray.map((item, index) => (
              <TweetComponents tweet={item} key={item._id} />
            ))}

          {/* <TweetComponents tweet={tweetData} />
          <TweetComponents tweet={tweetData} />
          <TweetComponents tweet={tweetData} />
          <TweetComponents tweet={tweetData} /> */}
          {/* <div className='text-white h-screen'>Home 1</div>
          <div className='text-white h-screen'>Home 2</div>
          <div className='text-white h-screen'>Home 3</div>
          <div className='text-white h-screen'>Home 4</div> */}
        </main>
      </div>
    </>
  )
}
export default Home
