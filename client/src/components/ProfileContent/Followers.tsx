import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export type ReturnedUser = {
  _id: string
  avatarURL: string
  name: string
  userTag: string
  bio: string
}
export interface ReturnedData {
  followers: ReturnedUser[] | []
  following: ReturnedUser[] | []
}
const Followers = () => {
  const [followers, setFollowers] = useState<ReturnedUser[]>([])
  const context: { userTag: string } = useOutletContext()

  useEffect(() => {
    const handleFetch = async () => {
      const { data }: { data: ReturnedData } = await axios.get(
        `http://localhost:4000/api/v1/user/connected/${context.userTag}`
      )

      setFollowers(data.followers)
    }
    handleFetch()
  }, [])

  console.log(followers)
  return (
    <div>
      {followers.map((follower) => (
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

export const ListItem = ({
  name,
  userTag,
  avatarURL,
  bio,
}: {
  name: string
  userTag: string
  avatarURL: string
  bio: string
}) => {
  const [buttonText, setButtonText] = useState<'Following' | 'Unfollow'>(
    'Following'
  )
  return (
    <div className='flex  px-4 py-4 cursor-pointer hover:bg-[rgba(30,39,50,0.95)] duration-75'>
      <div className='w-12 h-12 overflow-hidden rounded-full '>
        <img src={avatarURL} alt='' className='w-full h-full object-cover' />
      </div>
      <div className='flex flex-col flex-1 pl-3'>
        <div className='flex justify-between'>
          <div className='flex flex-col text-[15px]'>
            <div className='font-bold'>{name}</div>
            <div className='text-[#8b98a5]'>@{userTag}</div>
          </div>
          <a href=''>
            <button
              className={`w-[100px] h-[31px] font-bold border border-slate-500 border-opacity-70  text-[14px] rounded-full
              hover:text-red-600 hover:border-red-800 hover:bg-red-800 hover:bg-opacity-10
              `}
              onMouseEnter={() => setButtonText('Unfollow')}
              onMouseLeave={() => setButtonText('Following')}
            >
              {buttonText}
            </button>
          </a>
        </div>
        <div>Extra text to test the layout</div>
      </div>
    </div>
  )
}
export default Followers
