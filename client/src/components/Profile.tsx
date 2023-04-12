import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { User } from '../features/user/authSlice'

const Profile = () => {
  const [user, setUser] = useState<User | null>(null)
  const { userTag } = useParams()
  const { state } = useLocation()

  let letter: string = 'P'

  if (userTag) letter = userTag[0].toUpperCase()

  useEffect(() => {
    const getProfile = async (query: object) => {
      const response = await fetch(
        'http://localhost:4000/api/v1/user/profile',
        {
          method: 'POST',
          body: JSON.stringify(query),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )
      const data: { user: User } = await response.json()
      console.log('This is the Returned Data: ', data)
      setUser(data.user)
    }
    getProfile(state)
  }, [state])

  return (
    <>
      <div className='flex flex-col w-[600px]'>
        <div>
          <span className='text-3xl mr-3'>&#x2190;</span>
          <span className='text-xl font-bold'>{user?.name}</span>
          <p className='text-sm'>0 Tweets</p>
        </div>
        <div className='w-[598px] h-[199px] bg-gray-500'></div>
        <div className='relative'>
          <div
            className='absolute w-36 h-36 bg-red-700 rounded-full -top-16 left-4 border-[rgb(21,23,26)] 
        border-[4px] flex justify-center items-center overflow-hidden hover:brightness-90 duration-100 cursor-pointer'
          >
            <img
              src={`https://placehold.co/600x400?text=${letter}`}
              alt=''
              className='w-full h-full object-cover object-center'
            />
          </div>
          <div className='flex justify-end pt-3 px-3'>
            <button className='py-1 px-5 font-bold border-[1px] border-slate-500 border-opacity-40 rounded-full'>
              Edit profile
            </button>
          </div>
          <div className='pt-10'>
            <p>{user?.name}</p>
            <p>{user?.userTag ? user.userTag : 'User Tag'}</p>
            <p>{user?.createdAt}</p>
            <p>
              <span>{user?.followersCount} Followers</span>{' '}
              <span>{user?.followingCount} Following</span>
            </p>
          </div>

          <p>Nav Links</p>
        </div>
      </div>
    </>
  )
}
export default Profile
