import { getTweets } from '../../features/tweets/tweetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../../app/store'
import { useOutletContext } from 'react-router-dom'
import TweetComponents from '../TweetComponents'
import type { ReturnThread } from '../../features/tweets/tweetSlice'

const PersonalTweets = () => {
  const tweets = useSelector((state: RootState) => state.tweet.tweets)
  const dispatch = useDispatch<AppDispatch>()
  const outletContextData: { _id: String } = useOutletContext()

  useEffect(() => {
    if (outletContextData._id) {
      dispatch(getTweets(outletContextData._id))
    }
  }, [outletContextData])

  return (
    <div>
      {tweets &&
        tweets.map((item, index) => (
          <TweetComponents
            tweet={item as unknown as ReturnThread}
            key={index}
          />
        ))}
    </div>
  )
}
export default PersonalTweets
