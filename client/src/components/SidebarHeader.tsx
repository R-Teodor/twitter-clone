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

type NavProps = {
  isActive: boolean
  isPending?: boolean
}
type StylingStyles = {
  className: string
}

const SidebarHeader = () => {
  const activeLink: StylingStyles = {
    className: 'font-bold cursor-pointer    ',
  }
  const nonActiveLink: StylingStyles = {
    className: 'cursor-pointer    ',
  }

  const getCredentials = async () => {
    const req = {
      email: '',
      password: '',
    }

    fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  return (
    <header className='flex flex-col items-end flex-shrink-0 flex-grow relative'>
      <nav className='xl:w-[275px] flex flex-col text-xl px-2  h-screen overflow-auto sticky top-0 gap-1.5'>
        <NavLink to='/' className='font-bold cursor-pointer p-3'>
          <RiTwitterFill size={34} />
        </NavLink>
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
        <NavLink
          to={'profile'}
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
        <NavLink to={'#'} className={nonActiveLink.className}>
          <div className='flex gap-4 p-3 hover:bg-slate-700 rounded-full w-fit'>
            <span>
              <TbDotsCircleHorizontal size={28} />
            </span>
            <span className='hidden xl:block'>More</span>
          </div>
        </NavLink>

        {/* <button className='font-bold cursor-pointer bg-[#1D9BF0]'>Tweet</button> */}

        <a
          href='#'
          className=' xl:w-[90%] xl:rounded-3xl xl:py-3 xl:block hidden bg-[#1D9BF0] text-center font-bold text-lg rounded-full'
        >
          Tweet
        </a>
        <a
          href='#'
          className='xl:hidden bg-[#1D9BF0]  text-lg rounded-full w-[56px] h-[56px] flex justify-center items-center'
        >
          <FaFeather size={22} />
        </a>

        <button className='py-11' onClick={getCredentials}>
          {/* <p>user</p>
          <p>username</p> */}
          Credentials
        </button>
      </nav>
    </header>
  )
}
export default SidebarHeader
