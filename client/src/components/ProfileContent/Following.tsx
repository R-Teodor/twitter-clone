import axios from 'axios'
import { useEffect, useState } from 'react'
import { ReturnedData, ReturnedUser } from './Followers'
import { ListItem } from './Followers'
import { useOutletContext } from 'react-router-dom'

const Following = () => {
  const [followings, setFollowings] = useState<ReturnedUser[]>([])
  const context: { userTag: string } = useOutletContext()

  useEffect(() => {
    const handleFetch = async () => {
      const { data }: { data: ReturnedData } = await axios.get(
        `http://localhost:4000/api/v1/user/connected/${context.userTag}`
      )

      setFollowings(data.following)
    }
    handleFetch()
  }, [])
  return (
    <div>
      {followings.map((follower) => (
        <ListItem
          key={follower._id}
          avatarURL={follower.avatarURL}
          name={follower.name}
          userTag={follower.userTag}
          bio={follower.bio}
        />
      ))}
    </div>
  )
}
export default Following
