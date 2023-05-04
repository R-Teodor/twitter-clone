import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import TweetComponents from '../Tweets/TweetComponents'
import { useState } from 'react'
import type { ReturnThread } from '../../features/tweets/tweetSlice'

const Replies = () => {
  const outletContextData: { _id: string } = useOutletContext()
  const [repliesState, setRepliesState] = useState<ReturnThread[]>([])

  useEffect(() => {
    const handleRepliesFetch = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/tweet/?userId=${outletContextData._id}`
      )
      setRepliesState(data as ReturnThread[])
    }
    handleRepliesFetch()
  }, [outletContextData])
  return (
    <>
      {repliesState.map((tweet) => (
        <TweetComponents tweet={tweet} key={tweet._id} />
      ))}
    </>
  )
}
export default Replies
