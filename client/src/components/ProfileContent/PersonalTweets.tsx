import { useOutletContext } from 'react-router-dom'
import TweetComponents from '../Tweets/TweetComponents'
import { useGetThreadsByIdQuery } from '../../services/threads'
// import {RefObject} from 'react'

const PersonalTweets = () => {
  const outletContextData: { _id: string } = useOutletContext()

  // Try to find a smart way to implement getThreadsByUserTag
  const { data, error, isLoading, isFetching } = useGetThreadsByIdQuery(
    outletContextData._id
  )

  if (isFetching) return <div className='text-4xl bg-red-600'>ISLOADING</div>

  return (
    <div>
      {data &&
        data.map((item, index) => <TweetComponents tweet={item} key={index} />)}
    </div>
  )
}
export default PersonalTweets
