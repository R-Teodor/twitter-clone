import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../features/user/authSlice'

type ReturnedUser = Pick<User, '_id' | 'email' | 'name' | 'userTag'>

const TrendsForYou = () => {
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
    <div className='flex flex-col'>
      <div className='h-14 w-full'>
        <div className='fixed top-2 w-[350px] ' ref={dropDownRef}>
          <input
            type='search'
            name=''
            id=''
            className='peer px-6 py-3 w-full text-gray-300 bg-gray-700 rounded-3xl'
            placeholder='Search Twitter'
            value={searchInput}
            onChange={optimizedDebounce}
            onFocus={() => setToggleDropdownMenu(false)}
            // onBlur={() => setToggleDropdownMenu(true)}
          />

          {/* rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px; */}
          {/* shadow-[0px_0px_3px_1px_rgba(136, 153, 166, 0.15)] */}
          <div
            hidden={toggleDropdownMenu}
            className='bg-black mt-2 py-6 px-4 rounded-3xl box-content w-full 
            shadow-[0_0_15px_rgba(136,153,166,0.2),0_0_3px_1px_rgba(136,153,166,0.15)]
            
            '
          >
            {searchInput ? searchInput : 'Try searching for etc..'}
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
          </div>
        </div>
      </div>
      <section className=' bg-gray-700/25  rounded-3xl'>
        <h1 className='font-bold text-2xl '>Trends for You</h1>
        <main className='flex flex-col gap-2 '>
          <article>
            <p>Trending in Romania</p>
            <h2>Anna</h2>
            <p>116K Tweets</p>
          </article>
          <article>
            <p>Trending * Technology</p>
            <h2>GPT</h2>
            <p>216K Tweets</p>
          </article>
          <article>
            <p>Trending * Technology</p>
            <h2>GPT</h2>
            <p>216K Tweets</p>
          </article>
          <article>
            <p>Trending * Technology</p>
            <h2>GPT</h2>
            <p>216K Tweets</p>
          </article>
          <article>
            <p>Trending * Technology</p>
            <h2>GPT</h2>
            <p>216K Tweets</p>
          </article>
          <article>
            <p>Trending * Technology</p>
            <h2>GPT</h2>
            <p>216K Tweets</p>
          </article>
          <article>
            <p>Trending * Technology</p>
            <h2>GPT</h2>
            <p>216K Tweets</p>
          </article>
          <article>
            <p>Trending * Technology</p>
            <h2>GPT</h2>
            <p>216K Tweets</p>
          </article>
        </main>
      </section>
    </div>
  )
}

const ReturnedUserComponent = ({ user }: { user: ReturnedUser }) => {
  return (
    <div className='flex items-center gap-4 pt-4'>
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
export default TrendsForYou
