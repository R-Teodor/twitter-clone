import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoginModal } from '../../features/layers/layerSlice'
import type { AppDispatch } from '../../app/store'

const LoginModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(91,112,131,0.4)]
    flex justify-center items-center  z-20
    '
    >
      <div className='relative bg-[rgba(21,32,43,1.00)] py-12 px-24 rounded-3xl'>
        <button
          className='absolute top-4 left-5'
          onClick={() => dispatch(toggleLoginModal('Close'))}
        >
          x
        </button>
        <div className='max-w-[400px] flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>Want a convo etc.</h1>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
            minima nemo quas labore dolorum. Nisi.
          </div>
          <button className='bg-blue-500 rounded-3xl py-3'>Log In</button>
          <button className='bg-white text-blue-500 rounded-3xl py-3'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
export default LoginModal
