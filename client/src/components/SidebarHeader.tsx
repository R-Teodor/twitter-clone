import { NavLink } from 'react-router-dom'
import {
  RiHome7Fill,
  RiTwitterFill,
  RiHashtag,
  RiBookmarkLine,
  RiBellLine,
  RiMessageLine,
  RiProfileLine,
  RiTwitterLine,
} from 'react-icons/ri'
import { TbDotsCircleHorizontal } from 'react-icons/tb'
import { FaFeather } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../app/store'
import { login } from '../features/user/authSlice'
import { useState } from 'react'

type NavProps = {
  isActive: boolean
  isPending?: boolean
}
type StylingStyles = {
  className: string
}
type AppProps = {
  user: {
    userTag: string
    name: string
    avatar: string
  }
}

const SidebarHeader = ({ user }: AppProps) => {
  // const user = useSelector((state: RootState) => state.auth)
  // const dispatch = useDispatch<AppDispatch>()

  const activeLink: StylingStyles = {
    className: 'font-bold cursor-pointer    ',
  }
  const nonActiveLink: StylingStyles = {
    className: 'cursor-pointer    ',
  }

  return (
    <header className='flex flex-col items-end flex-shrink-0 flex-grow relative'>
      <nav className='xl:w-[275px] flex flex-col text-xl px-2  h-screen overflow-auto sticky top-0 gap-1.5'>
        <NavLink to='/' className='font-bold cursor-pointer p-3'>
          <RiTwitterFill size={34} />
        </NavLink>
        {user.userTag && (
          <NavLink
            to='/'
            className={({ isActive }: NavProps) =>
              isActive ? activeLink.className : nonActiveLink.className
            }
          >
            <div className='flex items-center gap-4 p-3 hover:bg-slate-700 rounded-full w-fit'>
              <span>
                <RiHome7Fill size={28} />
              </span>
              <span className='hidden xl:block'>Home</span>
            </div>
          </NavLink>
        )}
        <NavLink
          to='explore'
          className={({ isActive }: NavProps) =>
            isActive ? activeLink.className : nonActiveLink.className
          }
        >
          <div className='xl:flex gap-4 p-3 hover:bg-slate-700  rounded-full w-fit '>
            <span>
              <RiHashtag size={28} />
            </span>
            <span className='hidden xl:block'>Explore</span>
          </div>
        </NavLink>

        {user.userTag && (
          <NavLink
            to={'notifications'}
            className={({ isActive }: NavProps) =>
              isActive ? activeLink.className : nonActiveLink.className
            }
          >
            <div className='flex gap-4 p-3 hover:bg-slate-700  rounded-full w-fit'>
              <span>
                <RiBellLine size={28} />
              </span>
              <span className='hidden xl:block'>Notifications</span>
            </div>
          </NavLink>
        )}
        {user.userTag && (
          <NavLink
            to={'messages'}
            className={({ isActive }: NavProps) =>
              isActive ? activeLink.className : nonActiveLink.className
            }
          >
            <div className='flex gap-4 p-3 hover:bg-slate-700  rounded-full w-fit'>
              <span className='overflow-hidden'>
                <RiMessageLine size={28} />
              </span>
              <span className='hidden xl:block'>Messages</span>
            </div>
          </NavLink>
        )}
        {user.userTag && (
          <NavLink
            to={'bookmarks'}
            className={({ isActive }: NavProps) =>
              isActive ? activeLink.className : nonActiveLink.className
            }
          >
            <div className='flex gap-4 p-3 hover:bg-slate-700  rounded-full w-fit'>
              <span>
                <RiBookmarkLine size={28} />
              </span>
              <span className='hidden xl:block'>BookMarks</span>
            </div>
          </NavLink>
        )}
        {user.userTag && (
          <NavLink
            to={'twitterBl'}
            className={({ isActive }: NavProps) =>
              isActive ? activeLink.className : nonActiveLink.className
            }
          >
            <div className='flex gap-4 p-3 hover:bg-slate-700  rounded-full w-fit'>
              <span>
                <RiTwitterLine size={28} className='stroke' />
              </span>
              <span className='hidden xl:block'>Twitter Blue</span>
            </div>
          </NavLink>
        )}
        {user.userTag && (
          <NavLink
            to={user.userTag ? `/${user.userTag}` : 'profile'}
            className={({ isActive }: NavProps) =>
              isActive ? activeLink.className : nonActiveLink.className
            }
          >
            <div className='flex gap-4 p-3 hover:bg-slate-700  rounded-full w-fit'>
              <span>
                <RiProfileLine size={28} />
              </span>
              <span className='hidden xl:block'>Profile</span>
            </div>
          </NavLink>
        )}
        {user.userTag && (
          <NavLink to={'#'} className={nonActiveLink.className}>
            <div className='flex gap-4 p-3 hover:bg-slate-700 rounded-full w-fit'>
              <span>
                <TbDotsCircleHorizontal size={28} />
              </span>
              <span className='hidden xl:block'>More</span>
            </div>
          </NavLink>
        )}

        {/* <button className='font-bold cursor-pointer bg-[#1D9BF0]'>Tweet</button> */}

        {user.userTag && (
          <a
            href='#'
            className=' xl:w-[90%] xl:rounded-3xl xl:py-3 xl:block hidden bg-[#1D9BF0] text-center font-bold text-lg rounded-full'
          >
            Tweet
          </a>
        )}
        {user.userTag && (
          <a
            href='#'
            className='xl:hidden bg-[#1D9BF0]  text-lg rounded-full w-[56px] h-[56px] flex justify-center items-center'
          >
            <FaFeather size={22} />
          </a>
        )}

        <SelectUserComponent />

        {user.userTag && (
          <div
            className='absolute bottom-4 right-3 left-3 p-3 rounded-full text-white flex items-center 
          cursor-pointer hover:bg-slate-800/100 duration-100'
          >
            <div className='w-10 h-10 overflow-hidden rounded-full'>
              <img
                src='https://placehold.co/100x100'
                alt=''
                className='w-full h-full '
              />
            </div>
            <div className='flex justify-between flex-1'>
              <div className='flex flex-col pl-3'>
                <span className='text-base  font-bold'>{user.name}</span>
                <span className='text-sm text-[rgba(156,163,175,0.8)]'>
                  @{user.userTag}
                </span>
              </div>
              <span>...</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

const initialReq = {
  email: 'teodor@gmail.com',
  password: 'secret1234',
}
const SelectUserComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [req, setReq] = useState(initialReq)

  const handleSelectState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setReq({
      ...req,
      email: e.target.value,
    })
  }

  const handleLoginReq = () => {
    dispatch(login(req))
  }
  return (
    <>
      <select
        name=''
        id='users'
        className='text-slate-900 mt-6'
        onChange={handleSelectState}
      >
        <option value=''>Toader</option>
        <option value='ghabard0@skype.com'>Gerhardt</option>
        <option value='rkorn1@salon.com'>Rora</option>
        <option value='lemm2@google.cn'>Lorne</option>
        <option value='rdillaway3@indiatimes.com'>Rivi</option>
        <option value='jrushbury4@shareasale.com'>Jessy</option>
        <option value='hbole5@oakley.com'>Harlan</option>
        <option value='ccolliard6@virginia.edu'>Clayson</option>
        <option value='acreaven7@skype.com'>Amandie</option>
        <option value='codowgaine8@prnewswire.com'>Carlen</option>
        <option value='lhapps9@patch.com'>Legra</option>
      </select>
      <button onClick={handleLoginReq} className='p-4 mt-4'>
        Login
      </button>
    </>
  )
}

export default SidebarHeader
