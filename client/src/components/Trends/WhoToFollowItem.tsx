import type { User } from '../../features/user/authSlice'
import { useState } from 'react'

type ReturnedUser = Pick<User, '_id' | 'email' | 'name' | 'userTag'>

function WhoToFollowItem({ user }: { user: ReturnedUser }) {
  const [timeout, setModalTimeout] = useState<number>()
  const [userModal, setUserModal] = useState<boolean>(true)

  const handleMouseOver = () => {}

  return (
    <div className='flex items-center gap-4 py-3 px-4 hover:bg-gray-700/25'>
      <div className='w-14 h-14 overflow-hidden rounded-full'>
        <img src='https://placehold.co/100x100' alt='' className='w-full' />
      </div>
      <div className='flex justify-between flex-1'>
        <div className='flex flex-col'>
          <div className='max-w-[100px] whitespace-nowrap relative'>
            <p
              className='font-bold text-base hover:underline decoration-2 peer '

              // onMouseOver={() =>
              //   setModalTimeout(setTimeout(() => setUserModal(false), 1000))
              // }
              // onMouseLeave={() => {
              //   clearTimeout(timeout)
              //   setUserModal(true)
              // }}
            >
              {user.name}
            </p>
            <div className='border border-red-700 hidden'>Show Details</div>
          </div>
          <p className='text-gray-400/75 '>@{user.userTag}</p>
        </div>

        <div className='flex justify-center items-center'>
          <button className='bg-white font-semibold text-black rounded-3xl py-1 px-4'>
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}
export default WhoToFollowItem
