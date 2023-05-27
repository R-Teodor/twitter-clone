import { Outlet, useLocation, NavLink } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { useGetProfileByUserTagQuery } from '../../services/user'
const Followers = () => {
  // Maybe reimplementations of how to handle routing and data fetching
  // const { state } = useLocation()
  const location = useLocation()

  const { data, isFetching, error } = useGetProfileByUserTagQuery(
    location.pathname.split('/')[1]
  )
  console.log(data)
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col border-b-[1px] border-slate-500 border-opacity-40'>
        <div className=' flex  pb-1 px-2 items-center gap-7'>
          <div className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-600/40'>
            <HiArrowLeft size={18} />
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-[#F9F9F9] '>
              {data?.name}
            </span>
            <span className='text-[13px] text-[#8b98a5]'>@{data?.userTag}</span>
          </div>
        </div>
        <div className='flex text-[#8b98a5]'>
          <NavLink
            to={`${data?.userTag}/followers`}
            className={({
              isActive,
            }) => `flex items-center justify-center flex-1
            py-4 hover:bg-[rgba(247,249,249,0.09)] ${
              isActive ? 'font-bold text-[#F9F9F9]' : ''
            }
            `}
          >
            <div className='text-[15px]'>Followers</div>
          </NavLink>
          <NavLink
            to={`${data?.userTag}/following`}
            className={({
              isActive,
            }) => `flex items-center justify-center flex-1
            py-4 hover:bg-[rgba(247,249,249,0.09)] ${
              isActive ? 'font-bold text-[#F9F9F9]' : ''
            }
            `}
          >
            <div className='text-[15px]'>Following</div>
          </NavLink>
        </div>
      </div>
      <div className=''>
        <Outlet context={{ userTag: location.pathname.split('/')[1] }} />
      </div>
    </div>
  )
}
export default Followers
