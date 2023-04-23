import { getTweets } from '../../features/tweets/tweetSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch } from '../../app/store'

const PersonalTweets = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getTweets())
  }, [dispatch])
  return <div>PersonalTweets</div>
}
export default PersonalTweets
