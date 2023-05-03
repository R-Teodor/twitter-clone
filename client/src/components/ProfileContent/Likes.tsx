import axios from 'axios'
import { useState, useEffect } from 'react'
import TweetComponents from '../Tweets/TweetComponents'

const Likes = () => {
  const [likedTweets, setLikedTweets] = useState([])

  useEffect(() => {
    const handleFetch = async () => {
      const { data } = await axios.get(
        'http://localhost:4000/api/v1/user/likes',
        { withCredentials: true }
      )
      console.log(data.data.likes)
      setLikedTweets(data.data.likes)
    }
    handleFetch()
  }, [])

  return (
    <div>
      {likedTweets.map((item, index) => (
        <TweetComponents tweet={item} key={index} />
      ))}
    </div>
  )
}
export default Likes
