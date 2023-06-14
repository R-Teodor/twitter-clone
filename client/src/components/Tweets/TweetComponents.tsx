import { MdVerified } from 'react-icons/md'
import {
  FaComment,
  FaRetweet,
  FaHeart,
  FaChartBar,
  FaDownload,
} from 'react-icons/fa'
import type { ReturnThread } from '../../features/tweets/tweetSlice'
import type { AppDispatch } from '../../app/store'
import { Link, useNavigate, ScrollRestoration } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toggleLoginModal } from '../../features/layers/layerSlice'

export type TweetComponentProps = {
  tweet: ReturnThread
  auth?: boolean
}
type ClickEventType =
  | 'comments'
  | 'favorite'
  | 'retweets'
  | 'views'
  | 'download'
  | 'avatar'

const TweetComponents = ({ tweet, auth }: TweetComponentProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()

    navigate(`/${tweet.author.userTag}/status/${tweet._id}`, {
      state: tweet,
    })
  }

  const handleIconClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (auth == false) {
      return dispatch(toggleLoginModal('Open'))
    }
    const handler = e.currentTarget.id as ClickEventType
    if (handler == 'favorite') {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/tweet/favorite',
        { tweetId: tweet._id },
        { withCredentials: true }
      )

      console.log(data)
    }
    // console.log('This is the target', e.target)
    // console.log('This is the current target', e.currentTarget.id)
  }

  const handleProfileNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    navigate(`/${tweet.author.userTag}`)
  }

  if (tweet && Object.keys(tweet).length == 0) return <div>No Tweets</div>
  return (
    <>
      {/* <ScrollRestoration /> */}
      <div onClick={handleNavigation} className='cursor-pointer'>
        <div className='flex flex-row px-5 py-3 hover:bg-[rgba(247,249,249,0.03)] duration-150 border-b-[1px] border-slate-500 border-opacity-40'>
          <div
            className='w-12 h-12 overflow-hidden rounded-full flex-shrink-0 hover:brightness-75 duration-150'
            onClick={handleProfileNav}
          >
            <img
              src={tweet.author.avatarURL}
              alt=''
              className='w-full h-full object-cover object-center '
            />
          </div>

          <div className='w-full pl-3 flex flex-col '>
            <div className='flex flex-row w-full justify-between'>
              <div className='flex flex-row gap-1.5'>
                <div className='flex flex-row items-center gap-x-1'>
                  <span
                    className='font-bold text-base hover:underline'
                    onClick={handleProfileNav}
                  >
                    {tweet.author.name}
                  </span>
                  <span className='text-blue-500'>
                    {tweet._id ? <MdVerified size={20} /> : ''}
                  </span>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  <span className='text-[#8B98A5]'>
                    @{tweet.author.userTag}
                  </span>
                  <span className='text-[#8B98A5]'>{tweet.createdAt}</span>
                </div>
              </div>

              <span>...</span>
            </div>

            {tweet.content}

            <div className=''>
              {tweet.mediaUrl && (
                <img
                  src={tweet.mediaUrl}
                  alt=''
                  className='overflow-hidden rounded-3xl border-[1px] border-slate-500 border-opacity-40 max-w-[504px]'
                />
              )}
            </div>

            <div className='flex flex-row gap-14 pt-3'>
              <div
                className=' flex justify-center items-center text-[#8B98A5] cursor-pointer hover:text-cyan-500 group duration-150'
                id='comments'
                onClick={handleIconClick}
              >
                <div className='flex justify-center items-center w-8 h-8 rounded-full group-hover:bg-cyan-800 duration-150'>
                  <FaComment size={16} />
                </div>
                <div className='pl-2'>{tweet.comments?.length}</div>
              </div>
              <div
                className=' flex justify-center items-center text-[#8B98A5] cursor-pointer hover:text-green-400 group duration-150'
                id='retweets'
                onClick={handleIconClick}
              >
                <div className='flex justify-center items-center w-8 h-8 rounded-full group-hover:bg-green-900 duration-150'>
                  <FaRetweet size={16} />
                </div>
                <div className='pl-2'>{tweet.comments?.length}</div>
              </div>
              <div
                className=' flex justify-center items-center text-[#8B98A5] cursor-pointer hover:text-pink-300 group duration-150'
                id='favorite'
                onClick={handleIconClick}
              >
                <div className='flex justify-center items-center w-8 h-8 rounded-full group-hover:bg-pink-600 duration-150'>
                  <FaHeart size={16} />
                </div>
                <div className='pl-2'>{tweet.comments?.length}</div>
              </div>

              <div
                className=' flex justify-center items-center  text-[#8B98A5] cursor-pointer hover:text-cyan-500 group duration-150'
                id='views'
                onClick={handleIconClick}
              >
                <div className='flex justify-center items-center w-8 h-8 rounded-full group-hover:bg-cyan-800 duration-150'>
                  <FaChartBar size={16} />
                </div>
                <div className='pl-2'>{tweet.comments?.length}</div>
              </div>
              <div
                className=' flex justify-center items-center text-[#8B98A5] cursor-pointer hover:text-cyan-500 group duration-150'
                id='download'
                onClick={handleIconClick}
              >
                <div className='flex justify-center items-center w-8 h-8 rounded-full group-hover:bg-cyan-800 duration-150'>
                  <FaDownload size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default TweetComponents
