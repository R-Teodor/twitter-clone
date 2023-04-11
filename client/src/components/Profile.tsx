import { useParams } from 'react-router-dom'

const Profile = () => {
  const { userTag } = useParams()
  let letter: string = 'P'

  if (userTag) letter = userTag[0].toUpperCase()

  return (
    <>
      <div className='flex flex-col w-[600px]'>
        <div>
          <span className='text-3xl mr-3'>&#x2190;</span>
          <span className='text-xl font-bold'>User Informatione</span>
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
            <p>User information</p>
            <p>User tag</p>
            <p>CreatedAt</p>
            <p>
              <span>0 Followers</span> <span>0 Following</span>
            </p>
          </div>

          <p>Nav Links</p>
        </div>
      </div>
    </>
  )
}
export default Profile
