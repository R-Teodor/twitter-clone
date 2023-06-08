import type { RootState, AppDispatch } from '../app/store'

import type { UserCredentials } from '../features/user/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAllUsers,
  login,
  checkLoginState,
} from '../features/user/authSlice'
import { useSearchParams } from 'react-router-dom'

import SearchBar from '../components/SearchBar'
import TrendItemComponent from '../components/Trends/TrendItem'
import Content from '../components/ExploreComponents/Content'
import { initialTrendsItems } from '../components/Trends/trends'

const Explore = () => {
  const authUser = useSelector((state: RootState) => state.auth)

  let [searchParams, setSearchParams] = useSearchParams()
  console.log([...searchParams])

  if (!authUser.userTag) {
    return <Content />
  }

  if ([...searchParams].length > 0) {
    return <div>Search Component</div>
  }

  return (
    <div className='w-full'>
      {/* Search Section */}
      <SearchBar inputWidth={600} displayCog='' />

      {/* Trends Section */}
      <section className='border-b-[1px] border-slate-500 border-opacity-40  overflow-hidden'>
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

      {/* Info Section */}
      <section>
        <h1 className='font-bold text-xl py-2 px-4'>What's happening</h1>
        <main className='pb-28'>
          <SportsGame title='WNB' desc='Final * WNB' />
          <SportsGame title='WNB' desc='Final * WNB' />
          <SportsGame title='WNB' desc='Final * WNB' />
          <SportsGame title='WNB' desc='Final * WNB' />
          <SportsGame title='WNB' desc='Final * WNB' />

          <p className='py-4'>Show More</p>
        </main>
      </section>
    </div>
  )
}

const SportsGame = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className='flex flex-col px-5 py-2'>
      <div className='flex justify-between '>
        <span>{title}</span>
        <span>{desc}</span>
      </div>
      <div className='flex justify-between bg-red-500 px-5'>
        <div className='flex gap-4 '>
          <span>IMG</span>
          <span>Miami Marlins</span>
        </div>
        <div>2</div>
      </div>
      <div className='flex justify-between bg-blue-500 px-5'>
        <div className='flex gap-4 '>
          <span>IMG</span>
          <span>LA ANGELS</span>
        </div>
        <div>0</div>
      </div>
    </div>
  )
}
export default Explore
