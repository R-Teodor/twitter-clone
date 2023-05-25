import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  useGetProfileByUserTagQuery,
  useHandleFollowProfileMutation,
} from '../services/user'
import { AppDispatch } from '../app/store'
import { toggleProfileModal } from '../features/layers/layerSlice'

const Profile = () => {
  const { userTag } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { data, isFetching } = useGetProfileByUserTagQuery(userTag as string)
  const [follow, result] = useHandleFollowProfileMutation()

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
          <span className='text-xl font-bold'>{data?.name}</span>
          <p className='text-sm'>0 Tweets</p>
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
              className='py-1 px-5 font-bold border-[1px] border-slate-500 border-opacity-40 rounded-full'
              onClick={(e) => handleFollow(e, data?._id)}
            >
              {data?.mainProfile
                ? 'Edit Profile'
                : data?.isFollowing
                ? 'Unfollow'
                : 'Follow'}
            </button>
          </div>
          <div className='pt-10'>
            <p>{data?.name}</p>
            <p>{data?.userTag ? data.userTag : 'User Tag'}</p>
            <p>{data?.createdAt}</p>
            <p>
              <span>{data?.followersCount} Followers</span>{' '}
              <span>{data?.followingCount} Following</span>
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
        <Outlet context={{ _id: data?._id }} />
      </div>
    </>
  )
}

export default Profile
