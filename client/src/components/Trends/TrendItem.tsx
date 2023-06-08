import { IoEllipsisHorizontal } from 'react-icons/io5'
import type { TrendItem } from './trends'

const TrendItem = ({ trendItem }: { trendItem: TrendItem }) => {
  return (
    <article className='flex flex-col justify-center px-4 py-[10px] hover:bg-gray-700/25  cursor-pointer duration-150'>
      <div className='flex justify-between text-gray-400/80  text-[13px]'>
        <p>{trendItem.location}</p>
        <div className='w-9 relative flex justify-center items-center group'>
          <div className='h-9 w-9 bg-[rgba(29,155,240,0.3)] opacity-25 justify-center items-center absolute top-0 left-0 bottom-0 right-0 m-auto invisible group-hover:visible rounded-full'></div>
          <div className='group-hover:text-[rgb(29,155,240)]'>
            <IoEllipsisHorizontal size={18} />
          </div>
        </div>
      </div>
      <h2 className='font-bold text-[15px]'>{trendItem.trend}</h2>
      <p className='text-gray-400/75 text-[13px]'>{trendItem.tweets}K Tweets</p>
    </article>
  )
}
export default TrendItem
