import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { User } from '../features/user/authSlice'
import { RootState } from '../app/store'
import { useGetProfileByUserTagQuery } from '../services/user'
import { AppDispatch } from '../app/store'
import { toggleProfileModal } from '../features/layers/layerSlice'

const Profile = () => {
  const [user, setUser] = useState<
    (User & { isFollowing: boolean; mainProfile: boolean }) | null
  >(null)
  const { userTag } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  // const { state } = useLocation()
  const userDetails = useSelector((state: RootState) => state.auth)
  console.log(userDetails)
  const { data, isLoading, error } = useGetProfileByUserTagQuery(
    userTag as string
  )
  let userProfile = false

  console.log('RTK GET PROFILE : ', data)

  // console.log('isloading :', isLoading)
  if (data && data.user) {
    userProfile = data.user._id == userDetails._id
  }

  let letter: string = 'P'
  if (userTag) letter = userTag[0].toUpperCase()

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    followId: string | undefined
  ) => {
    // ###### Need to implement different request logic or send a query with the type of action ex.: follow /unfollow to the backend and let the server process the logic
    // if (e.currentTarget.textContent == 'Follow') console.log('Lets follow')
    // if (e.currentTarget.textContent == 'Unfollow') console.log('Lets Unfollow')
    // if (e.currentTarget.textContent == 'Edit Profile')
    //   console.log('Lets Change Profile details')

    if (userProfile && e.currentTarget.textContent == 'Edit Profile') {
      dispatch(toggleProfileModal('Open'))
    }
    if (!followId) return
    if (!data?.user?.isFollowing) {
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
        <div className='w-[598px] h-[199px] bg-gray-500'>
          <img
            src={data?.user?.bgURL}
            alt=''
            className='w-full h-full object-cover object-center'
          />
        </div>
        <div className='relative'>
          <div
            className='absolute w-36 h-36 bg-red-700 rounded-full -top-16 left-4 border-[rgb(21,23,26)] 
        border-[4px] flex justify-center items-center overflow-hidden hover:brightness-90 duration-100 cursor-pointer'
          >
            <img
              src={data?.user?.avatarURL}
              alt=''
              className='w-full h-full object-cover object-center'
            />
          </div>
          <div className='flex justify-end pt-3 px-3'>
            <button
              className='py-1 px-5 font-bold border-[1px] border-slate-500 border-opacity-40 rounded-full'
              onClick={(e) => handleFollow(e, data.user?._id)}
            >
              {userProfile
                ? 'Edit Profile'
                : data?.user?.isFollowing
                ? 'Unfollow'
                : 'Follow'}
              {/* {data?.user?.isFollowing
                ? 'Unfollow'
                : data?.user?.mainProfile
                ? 'Edit Profile'
                : 'Follow'} */}
              {/* {data?.user?.mainProfile && 'Edit Profile'} */}
            </button>
            {/* <button onClick={() => dispatch(toggleProfileModal('Open'))}>
              EditProfile
            </button> */}
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

          <div className='flex flex-row w-full border-b-[1px] border-slate-500 border-opacity-40 text-lg text-[rgb(139,152,165)] '>
            <NavLink to={''} className={'flex-1'} end>
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? 'py-4 px-6 flex justify-center items-center relative before:w-full  before:h-1 before:bg-[rgb(28,155,240)] before:absolute  before:-bottom-0  before:rounded-md font-bold text-white'
                      : 'py-4 px-6 flex justify-center items-center'
                  }
                >
                  Tweets
                </span>
              )}
            </NavLink>
            <NavLink to={'with_replies'} className={'flex-1'}>
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? 'py-4 px-6 flex justify-center items-center relative before:w-full  before:h-1 before:bg-[rgb(28,155,240)] before:absolute  before:-bottom-0  before:rounded-md font-bold text-white'
                      : 'py-4 px-6 flex justify-center items-center'
                  }
                >
                  Replies
                </span>
              )}
            </NavLink>
            <NavLink to={'media'} className={'flex-1'}>
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? 'py-4 px-6 flex justify-center items-center relative before:w-full  before:h-1 before:bg-[rgb(28,155,240)] before:absolute  before:-bottom-0  before:rounded-md font-bold text-white'
                      : 'py-4 px-6 flex justify-center items-center'
                  }
                >
                  Media
                </span>
              )}
            </NavLink>
            <NavLink to={'likes'} className={'flex-1'}>
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? 'py-4 px-6 flex justify-center items-center relative before:w-full  before:h-1 before:bg-[rgb(28,155,240)] before:absolute  before:-bottom-0  before:rounded-md font-bold text-white'
                      : 'py-4 px-6 flex justify-center items-center'
                  }
                >
                  Likes
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      <div>
        <Outlet context={{ _id: data?.user?._id }} />
      </div>
    </>
  )
}

export default Profile
