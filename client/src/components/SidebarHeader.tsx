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
  userTag: string
}

const SidebarHeader = ({ userTag }: AppProps) => {
  // const userTag = useSelector((state: RootState) => state.auth.userTag)
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
        {userTag && (
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

        {userTag && (
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
        {userTag && (
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
        {userTag && (
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
        {userTag && (
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
        {userTag && (
          <NavLink
            to={userTag ? `/${userTag}` : 'profile'}
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
        {userTag && (
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

        {userTag && (
          <a
            href='#'
            className=' xl:w-[90%] xl:rounded-3xl xl:py-3 xl:block hidden bg-[#1D9BF0] text-center font-bold text-lg rounded-full'
          >
            Tweet
          </a>
        )}
        {userTag && (
          <a
            href='#'
            className='xl:hidden bg-[#1D9BF0]  text-lg rounded-full w-[56px] h-[56px] flex justify-center items-center'
          >
            <FaFeather size={22} />
          </a>
        )}

        <SelectUserComponent />
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
