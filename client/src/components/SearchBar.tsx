import { useEffect, useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'

import type { User } from '../features/user/authSlice'

type ReturnedUser = Pick<User, '_id' | 'email' | 'name' | 'userTag'>

const SearchBar = ({
  inputWidth,
  displayCog,
}: {
  inputWidth: number
  displayCog: string
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState<ReturnedUser[]>([])
  const [toggleDropdownMenu, setToggleDropdownMenu] = useState(true)

  const dropDownRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (query: string) => {
    if (!query) return setSearchData([])
    const response = await fetch('http://localhost:4000/api/v1/user/search', {
      method: 'POST',
      body: JSON.stringify({ query: query }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data = await response.json()
    console.log(data?.results)
    setSearchData(data.results)
  }

  //   Testing Only
  const handleQueryString = (query: string) => {
    const newQuery = query.trim().replaceAll(' ', '%')
    return newQuery
  }
  //   Testing Only

  const handleSubmit = async () => {}

  const debounce = () => {
    let timeoutID: ReturnType<typeof setTimeout>
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleSearch(e.target.value)
      }, 1000)
    }
  }
  const optimizedDebounce = useMemo(() => debounce(), [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        // console.log(dropDownRef.current)
        setToggleDropdownMenu(true)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className='flex h-16 w-full'>
      <div
        className={`fixed top-0 w-[${inputWidth}px] py-2 z-10 bg-[#15202B]`}
        // className='fixed top-2 w-[350px]'
        ref={dropDownRef}
      >
        <div className='flex items-center'>
          <div className='flex items-center relative w-full bg-gray-700 rounded-3xl border-[1px] border-transparent focus-within:border-[#1D9BF0] focus-within:bg-[#15202B] box-border'>
            <label htmlFor='queryDB' className='pl-4'>
              <AiOutlineSearch size={24} />
            </label>

            <input
              type='search'
              name=''
              id='queryDB'
              className='peer px-6 py-2 w-full text-gray-300  rounded-3xl outline-none bg-transparent'
              placeholder='Search Twitter'
              autoComplete='off'
              value={searchInput}
              onChange={optimizedDebounce}
              onFocus={() => setToggleDropdownMenu(false)}
              // onBlur={() => setToggleDropdownMenu(true)}
            />
          </div>

          <div className={`w-[90px] ${displayCog}`}>cog</div>
        </div>
        {/* rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px; */}
        {/* shadow-[0px_0px_3px_1px_rgba(136, 153, 166, 0.15)] */}
        <div
          hidden={toggleDropdownMenu}
          className='bg-[#15202B] min-h-[72px]  pb-4  rounded-xl box-content w-full 
            shadow-[0_0_15px_rgba(136,153,166,0.2),0_0_3px_1px_rgba(136,153,166,0.15)]
            '
        >
          {searchInput ? (
            <>
              {/* Testing Only */}
              <Link to={`/explore?q=${handleQueryString(searchInput)}`}>
                Go to {`'${searchInput}'`}
              </Link>
              {/* Testing Only */}
              <RecommendedSearchComponent text={searchInput} key={9999} />
              <RecommendedSearchComponent
                text={`${searchInput} profile1`}
                key={999912}
              />
              <RecommendedSearchComponent
                text={`${searchInput} profile2`}
                key={9929429925}
              />
            </>
          ) : (
            <div className='py-6 px-8'>
              Try searching for people, topics, or keywords
            </div>
          )}
          {searchData?.map((user) => {
            return (
              <Link
                to={`/${user.userTag}`}
                key={user._id}
                state={{ _id: user._id }}
              >
                <ReturnedUserComponent user={user} key={user._id} />
              </Link>
            )
          })}
          {searchInput ? (
            <RecommendedSearchComponent text={`Go to @${searchInput}`} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

const RecommendedSearchComponent = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center gap-4 py-2 px-4 cursor-pointer hover:bg-[rgba(30,39,50,0.95)]'>
      <div className='flex items-center justify-center w-14 h-14'>
        <FaSearch size={32} />
      </div>

      <div>
        <p>{text}</p>
      </div>
    </div>
  )
}

const ReturnedUserComponent = ({ user }: { user: ReturnedUser }) => {
  return (
    <div className='flex items-center gap-4 py-2 px-4 hover:bg-[rgba(30,39,50,0.95)]'>
      <div className='w-14 h-14 overflow-hidden rounded-full'>
        <img src='https://placehold.co/100x100' alt='' className='w-full' />
      </div>
      <div className='flex flex-col'>
        <p>{user.name}</p>
        <p>{user.userTag}</p>
      </div>
    </div>
  )
}
export default SearchBar
