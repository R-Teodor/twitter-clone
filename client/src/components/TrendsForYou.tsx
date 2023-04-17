import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const TrendsForYou = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState<any[]>([])
  const [toggleDropdownMenu, setToggleDropdownMenu] = useState(true)

  const handleSearch = async (query: string) => {
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

  const handleFollow = async (followId: string) => {
    const response = await fetch('http://localhost:4000/api/v1/user/follow', {
      method: 'POST',
      body: JSON.stringify({ followId }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data = await response.json()
    console.log(data)
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

  return (
    <div className='flex flex-col'>
      <div className='h-14'>
        <div className='fixed top-2  bg-black'>
          <input
            type='search'
            name=''
            id=''
            className='peer px-6 py-3 text-black '
            value={searchInput}
            onChange={optimizedDebounce}
            onFocus={() => setToggleDropdownMenu(false)}
            onBlur={() => setToggleDropdownMenu(true)}
          />

          <div hidden={false}>
            {searchInput ? searchInput : 'Try searching for etc..'}
            {searchData?.map((user) => {
              return (
                <Link
                  to={`/${user.name}`}
                  key={user._id}
                  state={{ _id: user._id }}
                >
                  <div className='text-3xl flex gap-2'>
                    {user?.name}
                    {/* <button onClick={() => handleFollow(user._id)}>Follow</button> */}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <section className='w-[80%] bg-gray-700/25 '>
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
export default TrendsForYou
