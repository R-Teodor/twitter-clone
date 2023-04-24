import { getTweets } from '../../features/tweets/tweetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../../app/store'
import { useOutletContext } from 'react-router-dom'

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
        tweets.map((item, index) => <div key={index}>{item.content}</div>)}
    </div>
  )
}
export default PersonalTweets
