import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { toggleProfileModal } from '../../features/layers/layerSlice'
import { useState, useEffect } from 'react'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import axios from 'axios'

const initialState = {
  bgImage: new File([''], 'filename'),
  avatar: new File([''], 'filename'),
  name: 'Jenkins',
  bio: 'A hardworking boi',
  location: '31 State Avenu, Los Angeles',
  website: '',
  birthDate: '',
}

export const EditProfile = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => {
    return {
      name: state.auth.name,
      bio: state.auth.bio,
      location: state.auth.location,
      website: state.auth.website,
      birthDate: state.auth.birthDate,
      bgImage: new File([''], 'filename'),
      avatar: new File([''], 'filename'),
    }
  })
  console.log(user)
  const [profile, setProfile] = useState(initialState)

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id == 'backgroundImage' && e.target.files)
      setProfile({ ...profile, bgImage: e.target.files[0]! })
    else if (e.target.id == 'avatarImage' && e.target.files)
      setProfile({ ...profile, avatar: e.target.files[0]! })
  }
  if (profile.avatar.size > 0) console.log('exists')

  const handleMultiform = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const dataForm = new FormData()

    // if (profile.avatar) dataForm.append('avatar', profile.avatar)
    // if (profile.bgImage) dataForm.append('bgImage', profile.bgImage)

    Object.keys(user).forEach((key) =>
      dataForm.append(key, profile[key as keyof typeof profile])
    )
    for (var pair of dataForm.entries()) {
      console.log(pair[0] + '  ' + pair[1])
    }

    const { data } = await axios.post(
      'http://localhost:4000/api/v1/user/edit',
      dataForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )

    console.log(data)
    dispatch(toggleProfileModal('Close'))
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '17px'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  return (
    <div
      className={`flex justify-center items-center fixed top-0  left-0 w-full h-full bg-[rgba(91,112,131,0.4)] z-50 
    ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className='max-h-[650px] h-full w-[600px] overflow-hidden rounded-2xl'>
        <div className='flex flex-col w-full h-full relative bg-[rgba(21,32,43,1.00)]  overflow-y-scroll  rounded-b-2xl '>
          <header className='flex justify-between px-3 py-1 bg-[rgba(21,32,43,0.75)] backdrop-blur-lg sticky top-0 z-10'>
            <div>
              <button
                className='text-white text-xl p-2 '
                onClick={() => dispatch(toggleProfileModal('Close'))}
              >
                X
              </button>
              <h1 className='inline-block pl-6'>Edit Profile</h1>
            </div>

            <button
              className='bg-white p-2 text-black rounded-2xl'
              onClick={handleMultiform}
            >
              Save
            </button>
          </header>

          <div className=''>
            <main className=''>
              <form action='' className='flex flex-col'>
                <div className='w-full h-52 flex justify-center  items-center relative  bg-gray-900'>
                  <label
                    className='flex justify-center items-center absolute  w-11 h-11  rounded-full cursor-pointer hover:bg-gray-800 duration-100'
                    htmlFor='backgroundImage'
                  >
                    <MdOutlineAddAPhoto size={20} className='text-white' />
                  </label>
                  <input
                    type='file'
                    name='backgroundImage'
                    id='backgroundImage'
                    className='hidden'
                    onChange={handleImgInput}
                  />

                  {profile.bgImage && (
                    <div className='w-full h-full overflow-hidden'>
                      <img
                        src={URL.createObjectURL(profile.bgImage)}
                        alt=''
                        className='w-full h-full object-cover'
                        loading='lazy'
                      />
                    </div>
                  )}
                </div>
                <div className='relative h-14'>
                  <div
                    className='flex justify-center items-center w-28 h-28 absolute -top-14 left-4 border-[rgb(21,23,26)] 
        border-[4px] rounded-full bg-gray-500 box-content overflow-hidden'
                  >
                    <label
                      className='flex justify-center absolute items-center w-11 h-11 bg-[rgba(0,0,0,0.4)]  rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.3)] duration-100'
                      htmlFor='avatarImage'
                    >
                      <MdOutlineAddAPhoto size={20} className='text-white' />
                    </label>
                    <input
                      type='file'
                      name=''
                      id='avatarImage'
                      className='hidden'
                      onChange={handleImgInput}
                    />
                    {profile.avatar && (
                      <div className='w-full h-full bg-red-500'>
                        <img
                          src={URL.createObjectURL(profile.avatar)}
                          alt=''
                          className='w-full h-full object-cover'
                          loading='lazy'
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className='px-5 py-3'>
                  <input
                    type='text'
                    placeholder='Name'
                    value={profile.name}
                    className='w-full py-4 px-6 bg-transparent text-gray-300 outline-none border-2 border-gray-700 '
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className='px-5 py-3 relative'>
                  <textarea
                    name=''
                    id='bio'
                    placeholder='Bio'
                    rows={4}
                    maxLength={160}
                    className='w-full pt-6 px-6 bg-transparent text-gray-300 outline-none border-2 border-gray-700 '
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                  />
                  <label htmlFor='bio' className='absolute top-4 right-8'>
                    {profile.bio?.length}/160
                  </label>
                </div>
                <div className='px-5 py-3'>
                  <input
                    type='text'
                    placeholder='Location'
                    className='w-full py-4 px-6 bg-transparent text-gray-300 outline-none border-2 border-gray-700 '
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </div>
                <div className='px-5 py-3'>
                  <input
                    type='text'
                    placeholder='Website'
                    className='w-full py-4 px-6 bg-transparent text-gray-300 outline-none border-2 border-gray-700 '
                    value={profile.website}
                    onChange={(e) =>
                      setProfile({ ...profile, website: e.target.value })
                    }
                  />
                </div>
                <div className='px-5 py-3'>
                  <p>
                    Birth Date{' '}
                    <span className='cursor-pointer text-blue-500'>Edit</span>
                  </p>
                  <p className='text-2xl font-semibold'>June 12, 1998</p>
                </div>
                <div className='px-5 pt-3 pb-14'>
                  <p className='text-2xl font-semibold'>
                    Switch to profesional
                  </p>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
