import { MdVerified } from 'react-icons/md'
import {
  FaComment,
  FaRetweet,
  FaHeart,
  FaChartBar,
  FaDownload,
} from 'react-icons/fa'

export type TweetObj = {
  userName: string
  userTag: string
  verified: boolean
  date: string
  tweetContent: {
    img?: string
    media?: string
    text: string
    reply?: string
  }
  comments?: string
  retweets?: string
  likes?: string
  views?: number
}
export type TweetComponentProps = {
  tweet: TweetObj 
}

const TweetComponents = ({ tweet }: TweetComponentProps) => {
  if(tweet && Object.keys(tweet).length == 0) return <div>No Tweets</div>
  return (
    <div className='flex flex-row px-5 py-3 hover:bg-[rgba(247,249,249,0.03)] duration-150 border-b-[1px] border-slate-500 border-opacity-40'>
      <div className='w-12 h-12 overflow-hidden rounded-full flex-shrink-0'>
        <img
          src='https://placehold.co/100x100'
          alt=''
          className='w-full object-contain object-center'
        />
      </div>
      <div className='w-full pl-3 flex flex-col '>
        <div className='flex flex-row w-full justify-between'>
          <div className='flex flex-row gap-1.5'>
            <div className='flex flex-row items-center gap-x-1'>
              <span className='font-bold text-base'>{tweet.userName}</span>
              <span className='text-blue-500'>
                {tweet.verified ? <MdVerified size={20} /> : ''}
              </span>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <span className='text-[#8B98A5]'>{tweet.userTag}</span>
              <span className='text-[#8B98A5]'>{tweet.date}</span>
            </div>
          </div>

          <span>...</span>
        </div>

        {tweet.tweetContent.text}
        <div className='overflow-hidden rounded-lg border-[1px] border-slate-500 border-opacity-40 w-[504px]'>
          {tweet.tweetContent.img && (
            <img src={tweet.tweetContent.img} alt='' />
          )}
        </div>

        <div className='flex flex-row gap-20'>
          <span className='text-[#8B98A5] cursor-pointer'>
            <FaComment size={20} /> {tweet.comments}
          </span>
          <span className='text-[#8B98A5] cursor-pointer'>
            <FaRetweet size={20} /> {tweet.retweets}
          </span>
          <span className='text-[#8B98A5] cursor-pointer'>
            <FaHeart size={20} /> {tweet.likes}
          </span>
          <span className='text-[#8B98A5] cursor-pointer'>
            <FaChartBar size={20} /> {tweet.views}
          </span>
          <span className='text-[#8B98A5] cursor-pointer'>
            <FaDownload size={20} />
          </span>
        </div>
      </div>
    </div>
  )
}
export default TweetComponents
