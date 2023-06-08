import { ReturnThread } from '../../features/tweets/tweetSlice'
import TweetComponents from '../Tweets/TweetComponents'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Content = () => {
  const [content, setContent] = useState<ReturnThread[]>([])

  useEffect(() => {
    const feed = async () => {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/tweet/feed',
        {
          skip: 0,
        }
      )
      console.log(data)
      setContent(data)
    }
    feed()
  }, [])
  return (
    <div>
      {content.map((item, index) => (
        <TweetComponents tweet={item} key={index} />
      ))}
    </div>
  )
}
export default Content
