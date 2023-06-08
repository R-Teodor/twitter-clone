import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AiOutlineSearch } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'

import type { User } from '../features/user/authSlice'

import SearchBar from './SearchBar'
import WhoToFollowItem from './Trends/WhoToFollowItem'
import TrendItemComponent from './Trends/TrendItem'
import { initialTrendsItems } from './Trends/trends'

type ReturnedUser = Pick<User, '_id' | 'email' | 'name' | 'userTag'>

const initialUsersToFollow: ReturnedUser[] = [
  {
    _id: '123211124775234331',
    email: 'null',
    userTag: 'kyoko99',
    name: 'kyokoSan',
  },
  {
    _id: '12324213655474331',
    email: 'null',
    userTag: 'rupet_T-On',
    name: 'Ruptert Don Mano',
  },
  {
    _id: '123214332323231',
    email: 'null',
    userTag: 'simson_zzz',
    name: 'Sampo',
  },
]

const TrendsForYou = () => {
  // const [searchInput, setSearchInput] = useState('')
  // const [searchData, setSearchData] = useState<ReturnedUser[]>([])
  // const [toggleDropdownMenu, setToggleDropdownMenu] = useState(true)
  // const dropDownRef = useRef<HTMLDivElement>(null)

  const location = useLocation()

  // #### Handle Here the recommended search state
  // const handleSearch = async (query: string) => {
  //   if (!query) return setSearchData([])
  //   const response = await fetch('http://localhost:4000/api/v1/user/search', {
  //     method: 'POST',
  //     body: JSON.stringify({ query: query }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   })
  //   const data = await response.json()
  //   console.log(data?.results)
  //   setSearchData(data.results)
  // }

  // const debounce = () => {
  //   let timeoutID: ReturnType<typeof setTimeout>
  //   return (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchInput(e.target.value)
  //     clearTimeout(timeoutID)
  //     timeoutID = setTimeout(() => {
  //       handleSearch(e.target.value)
  //     }, 1000)
  //   }
  // }
  // const optimizedDebounce = useMemo(() => debounce(), [])

  // useEffect(() => {
  //   const handleClick = (event: MouseEvent) => {
  //     if (
  //       dropDownRef.current &&
  //       !dropDownRef.current.contains(event.target as Node)
  //     ) {
  //       // console.log(dropDownRef.current)
  //       setToggleDropdownMenu(true)
  //     }
  //   }

  //   document.addEventListener('click', handleClick)
  //   return () => {
  //     removeEventListener('click', handleClick)
  //   }
  // }, [])

  return (
    <div className='flex flex-col'>
      {location.pathname !== '/explore' && (
        <SearchBar inputWidth={350} displayCog='hidden' />
      )}

      {location.pathname !== '/explore' && (
        <section className='bg-[rgb(30,39,50)] border border-[#1e2732] rounded-2xl overflow-hidden'>
          <h1 className='font-bold text-xl py-2 px-4'>Trends for You</h1>
          <main className='flex flex-col'>
            {initialTrendsItems.map((trend, index) => (
              <TrendItemComponent trendItem={trend} key={index} />
            ))}
            <div className='hover:bg-gray-700/25 cursor-pointer text-[rgb(29,155,240)]'>
              <p className='px-4 py-3 '>Show More</p>
            </div>
          </main>
        </section>
      )}

      <section className='py-4'>
        <article className='bg-[rgb(30,39,50)] border border-[#1e2732] rounded-2xl overflow-hidden'>
          <h1 className='font-bold text-xl py-2 px-4'>Who to Follow</h1>
          <div>
            {initialUsersToFollow.map((user) => (
              <a href='#' key={user._id}>
                <WhoToFollowItem user={user} />
              </a>
            ))}
          </div>
          <div className='hover:bg-gray-700/25 cursor-pointer text-[rgb(29,155,240)]'>
            <p className='px-4 py-3 '>Show More</p>
          </div>
        </article>
      </section>

      <section className='h-14 py-10'></section>
    </div>
  )
}

// const TrendItemComponent = ({ trendItem }: { trendItem: TrendItem }) => {
//   return (
//     <article className='flex flex-col justify-center px-4 py-[10px] hover:bg-gray-700/25  cursor-pointer duration-150'>
//       <div className='flex justify-between text-gray-400/80  text-[13px]'>
//         <p>{trendItem.location}</p>
//         <div className='w-9 relative flex justify-center items-center group'>
//           <div className='h-9 w-9 bg-[rgba(29,155,240,0.3)] opacity-25 justify-center items-center absolute top-0 left-0 bottom-0 right-0 m-auto invisible group-hover:visible rounded-full'></div>
//           <div className='group-hover:text-[rgb(29,155,240)]'>
//             <IoEllipsisHorizontal size={18} />
//           </div>
//         </div>
//       </div>
//       <h2 className='font-bold text-[15px]'>{trendItem.trend}</h2>
//       <p className='text-gray-400/75 text-[13px]'>{trendItem.tweets}K Tweets</p>
//     </article>
//   )
// }

// {location.pathname !== '/explore' && (
//   <div className='h-16 w-full'>
//     <div
//       className='fixed top-0 w-[350px] py-2 z-10 bg-[#15202B]'
//       // className='fixed top-2 w-[350px]'
//       ref={dropDownRef}
//     >
//       <div className='flex items-center relative w-full bg-gray-700 rounded-3xl border-[1px] border-transparent focus-within:border-[#1D9BF0] focus-within:bg-[#15202B] box-border'>
//         <label htmlFor='queryDB' className='pl-4'>
//           <AiOutlineSearch size={24} />
//         </label>

//         <input
//           type='search'
//           name=''
//           id='queryDB'
//           className='peer px-6 py-2 w-full text-gray-300  rounded-3xl outline-none bg-transparent'
//           placeholder='Search Twitter'
//           autoComplete='off'
//           value={searchInput}
//           onChange={optimizedDebounce}
//           onFocus={() => setToggleDropdownMenu(false)}
//           // onBlur={() => setToggleDropdownMenu(true)}
//         />
//       </div>
//       {/* rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px; */}
//       {/* shadow-[0px_0px_3px_1px_rgba(136, 153, 166, 0.15)] */}
//       <div
//         hidden={toggleDropdownMenu}
//         className='bg-[#15202B] min-h-[72px]  pb-4  rounded-xl box-content w-full
//       shadow-[0_0_15px_rgba(136,153,166,0.2),0_0_3px_1px_rgba(136,153,166,0.15)]

//       '
//       >
//         {searchInput ? (
//           <>
//             <RecommendedSearchComponent text={searchInput} key={9999} />
//             <RecommendedSearchComponent
//               text={`${searchInput} profile1`}
//               key={999912}
//             />
//             <RecommendedSearchComponent
//               text={`${searchInput} profile2`}
//               key={9929429925}
//             />
//           </>
//         ) : (
//           <div className='py-6 px-8'>
//             Try searching for people, topics, or keywords
//           </div>
//         )}
//         {searchData?.map((user) => {
//           return (
//             <Link
//               to={`/${user.userTag}`}
//               key={user._id}
//               state={{ _id: user._id }}
//             >
//               <ReturnedUserComponent user={user} key={user._id} />
//             </Link>
//           )
//         })}
//         {searchInput ? (
//           <RecommendedSearchComponent text={`Go to @${searchInput}`} />
//         ) : null}
//       </div>
//     </div>
//   </div>
// )}
export default TrendsForYou
