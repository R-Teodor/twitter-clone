import { getTweets } from '../../features/tweets/tweetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../app/store'
import { useOutletContext } from 'react-router-dom'
import TweetComponents from '../Tweets/TweetComponents'
import type { ReturnThread } from '../../features/tweets/tweetSlice'
import { useGetThreadsByIdQuery } from '../../services/threads'

const PersonalTweets = () => {
  const tweets = useSelector((state: RootState) => state.tweet.tweets)
  const dispatch = useDispatch<AppDispatch>()
  const outletContextData: { _id: string } = useOutletContext()

  const { data, error, isLoading } = useGetThreadsByIdQuery(
    outletContextData._id
  )

  console.log('Outlet ContextData  ', outletContextData)
  console.log('This is data from rtkQuer: ', data)

  // useEffect(() => {
  //   if (outletContextData._id) {
  //     dispatch(getTweets(outletContextData._id))
  //   }
  // }, [outletContextData])
  if (isLoading) return <div className='text-4xl bg-red-600'>ISLOADING</div>

  return (
    <div>
      {data &&
        data.map((item, index) => <TweetComponents tweet={item} key={index} />)}
    </div>
  )
}
export default PersonalTweets
