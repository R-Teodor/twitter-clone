import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import type { User } from '../features/user/authSlice'
// import { RootState } from '../app/store'
import { useGetProfileByUserTagQuery } from '../services/user'

const Profile = () => {
  const [user, setUser] = useState<(User & { isFollowing: boolean }) | null>(
    null
  )
  const { userTag } = useParams()
  const navigate = useNavigate()
  // const { state } = useLocation()
  // const userDetails = useSelector((state: RootState) => state.auth)
  // console.log(userDetails)
  const { data, isLoading, error } = useGetProfileByUserTagQuery(
    userTag as string
  )
  console.log('RTK GET PROFILE : ', data)

  // console.log('isloading :', isLoading)

  let letter: string = 'P'
  // console.log(state?._id)

  if (userTag) letter = userTag[0].toUpperCase()

  const handleFollow = async (followId: string | undefined) => {
    if (!followId) return
    if (!user?.isFollowing) {
      const response = await fetch('http://localhost:4000/api/v1/user/follow', {
        method: 'POST',
        body: JSON.stringify({ followId }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await response.json()
      console.log(data)
      return
    }
    // ### Unfollow Logic after some backed refactoring
    console.log('Unfollow boii')
  }

  // useEffect(() => {
  //   const getQueryProfile = async (_id: string) => {
  //     const response = await fetch(`http://localhost:4000/api/v1/user/${_id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //     })

  //     const data = await response.json()
  //     setUser(data.user)
  //     console.log(data)
  //   }
  //   if (userTag) getQueryProfile(userTag)
  // }, [userTag])

  if (isLoading) return <div>LOADING......</div>

  return (
    <>
      <div className='flex flex-col w-[600px]'>
        <div>
          <span
            className='text-3xl mr-3 cursor-pointer'
            onClick={() => navigate(-1)}
          >
            &#x2190;
          </span>
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
            <button
              className='py-1 px-5 font-bold border-[1px] border-slate-500 border-opacity-40 rounded-full'
              onClick={() => handleFollow(data.user?._id)}
            >
              {data?.user?.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
          <div className='pt-10'>
            <p>{data?.user?.name}</p>
            <p>{data?.user?.userTag ? data.user.userTag : 'User Tag'}</p>
            <p>{data?.user?.createdAt}</p>
            <p>
              <span>{data?.user?.followersCount} Followers</span>{' '}
              <span>{data?.user?.followingCount} Following</span>
            </p>
          </div>

          <div className='flex flex-row gap-4 justify-center'>
            <NavLink to={''}>Tweets</NavLink>
            <NavLink to={'with_replies'}>Replies</NavLink>
            <NavLink to={'media'}>Media</NavLink>
            <NavLink to={'likes'}>Likes</NavLink>
          </div>
        </div>
      </div>

      <div>
        <Outlet context={{ _id: data.user?._id }} />
      </div>
    </>
  )
}

export default Profile
