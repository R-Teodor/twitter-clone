import { useParams, Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  useGetProfileByUserTagQuery,
  useHandleFollowProfileMutation,
} from '../services/user'
import { AppDispatch } from '../app/store'
import { toggleProfileModal } from '../features/layers/layerSlice'
import { HiArrowLeft } from 'react-icons/hi'
import { BsCalendar3 } from 'react-icons/bs'

const Profile = () => {
  const { userTag } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { data, isFetching, error, isError } = useGetProfileByUserTagQuery(
    userTag as string
  )
  const [follow, result] = useHandleFollowProfileMutation()

  console.log(error)

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    followId: string | undefined
  ) => {
    // ###### Need to implement different request logic or send a query with the type of action ex.: follow /unfollow to the backend and let the server process the logic
    // if (e.currentTarget.textContent == 'Follow') console.log('Lets follow')
    // if (e.currentTarget.textContent == 'Unfollow') console.log('Lets Unfollow')
    // if (e.currentTarget.textContent == 'Edit Profile')
    //   console.log('Lets Change Profile details')

    if (data?.mainProfile && e.currentTarget.textContent == 'Edit Profile') {
      return dispatch(toggleProfileModal('Open'))
    }
    if (!followId) return

    if (data?.mainProfile) return
    if (data && !data.isFollowing) {
      console.log(followId)
      follow({ followId, actionType: 'follow' })
    }
    // ### Unfollow Logic after some backed refactoring
    if (data && data?.isFollowing) {
      console.log(followId)
      follow({ followId, actionType: 'unfollow' })
    }
  }

  if (isFetching) return <div>Leding......</div>
  // console.log(new Date(`${data?.createdAt}`).toISOString())

  // ######### Implement Error handling for users not found
  if (isError) return <div>This Account does not exist</div>
  return (
    <>
      <div className='flex flex-col w-[600px]'>
        <div className='flex pl-4 pb-1 items-center gap-6'>
          <span className='mr-3 cursor-pointer' onClick={() => navigate(-1)}>
            <HiArrowLeft size={18} />
          </span>
          <div className='flex flex-col '>
            <span className='text-xl font-bold text-[#F9F9F9] '>
              {data?.name}
            </span>
            <p className='text-[13px] text-[#8b98a5]'>0 Tweets</p>
          </div>
        </div>
        <div className='w-[598px] h-[199px] bg-gray-500'>
          <img
            src={data?.bgURL}
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
              src={data?.avatarURL}
              alt=''
              className='w-full h-full object-cover object-center'
            />
          </div>
          <div className='flex justify-end pt-3 px-3'>
            <button
              className='py-2 px-4 text-[15px] font-bold border-[1px] border-slate-500 border-opacity-40 rounded-full'
              onClick={(e) => handleFollow(e, data?._id)}
            >
              {data?.mainProfile
                ? 'Edit Profile'
                : data?.isFollowing
                ? 'Unfollow'
                : 'Follow'}
            </button>
          </div>
          <div className='flex flex-col pt-10 pb-4 px-4'>
            <p className='text-xl font-bold'>{data?.name}</p>
            <p className='text-[15px] text-[#8b98a5]'>
              @{data?.userTag ? data.userTag : 'User Tag'}
            </p>

            <div className='flex items-center gap-2 pt-3 text-[#8b98a5] text-sm'>
              {' '}
              <BsCalendar3 />
              <div>Joined {new Date(`${data?.createdAt}`).toDateString()}</div>
            </div>

            <div className='pt-3 flex text-sm'>
              <Link
                to={`followers`}
                state={{ userTag, name: data?.name }}
                className='pr-3 cursor-pointer hover:underline'
              >
                {data?.followersCount}{' '}
                <span className='text-[#8b98a5]'>Followers</span>{' '}
              </Link>{' '}
              <Link
                to={'following'}
                state={{ userTag, name: data?.name }}
                className='cursor-pointer hover:underline'
              >
                {data?.followingCount}{' '}
                <span className='text-[#8b98a5]'>Following</span>{' '}
              </Link>
            </div>
          </div>

          <div className='flex flex-row w-full border-b-[1px] border-slate-500 border-opacity-40 text-[15px] text-[rgb(139,152,165)] '>
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
        <Outlet context={{ _id: data?._id }} />
      </div>
    </>
  )
}

export default Profile
