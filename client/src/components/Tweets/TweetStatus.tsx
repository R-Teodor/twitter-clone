import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import TweetComponents from './TweetComponents'
import axios, { AxiosPromise, AxiosResponse } from 'axios'
import type { ReturnThread } from '../../features/tweets/tweetSlice'
import TweetInputComponent from './TweetInputComponent'
import {
  FaComment,
  FaRetweet,
  FaHeart,
  FaChartBar,
  FaDownload,
} from 'react-icons/fa'

function StatusTest() {
  const { userTag, tweetId } = useParams()
  const { state } = useLocation()

  const [comments, setComments] = useState<any[] | undefined>([])
  const user = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    const populateCommentSection = async () => {
      const { data }: AxiosResponse<ReturnThread> = await axios.get(
        `http://localhost:4000/api/v1/tweet/replythread/${tweetId}`,
        { withCredentials: true }
      )
      console.log(data)
      setComments(data.comments)
    }

    if (!state)
      console.log(
        `Going to fetch tweet by using tweetID: ${tweetId} and userTag: ${userTag}`
      )
    populateCommentSection()
  }, [state])

  return (
    <section className='flex flex-col'>
      {/* {stateData?.parentThread && <div>'There is a parent component'</div>} */}
      <header className='px-4 '>
        <div className='text-xl py-4'>
          <span onClick={() => navigate(-1)} className='cursor-pointer'>
            &#x2190;
          </span>{' '}
          Tweet
        </div>
        <div className='flex justify-center gap-3'>
          <div className='w-11 h-11 overflow-hidden rounded-full'>
            <img
              src='https://placehold.co/600x400'
              alt=''
              className='object-cover w-full h-full'
            />
          </div>

          <div className='flex justify-between flex-1'>
            <div className='flex flex-col justify-center'>
              <div>{state?.author.name}</div>
              <div>@{state?.author.userTag}</div>
            </div>
            <div className='text-2xl'>
              <span>...</span>
            </div>
          </div>
        </div>

        <div className='pb-4'>{state?.content}</div>

        {state?.mediaUrl && (
          <div className='w-[564px] h-[464px] overflow-hidden rounded-3xl'>
            <img
              src={state.mediaUrl}
              alt=''
              className='w-full h-full object-cover object-center '
            />
          </div>
        )}

        <div className='pt-4 pb-4 border-b-[1px] border-slate-500 border-opacity-40'>
          {state?.createdAt}
        </div>

        <div className='pt-4 pb-4 border-b-[1px] border-slate-500 border-opacity-40'>
          <span>{0} Retweets</span>
          <span>{0} Quotes</span>
          <span>{0} Likes</span>
        </div>

        {/* ####### ReWrite the icons as a component to reuse!!! */}
        <div className='flex  justify-between py-4 px-12 text-[#8B98A5]'>
          <div className='cursor-pointer'>
            <FaComment size={16} />
          </div>
          <div className='cursor-pointer'>
            <FaRetweet size={16} />
          </div>
          <div className='cursor-pointer'>
            <FaHeart size={16} />
          </div>
          <div className='cursor-pointer'>
            <FaChartBar size={16} />
          </div>
          <div className='cursor-pointer'>
            <FaDownload size={16} />
          </div>
        </div>
      </header>

      <div className='pl-4 border-b-[1px] border-t-[1px] border-slate-500 border-opacity-40'>
        <TweetInputComponent componentType={'Reply'} tweetId={tweetId} />
      </div>
      <div>
        {comments?.map((item) => (
          <TweetComponents tweet={item} key={item._id} />
        ))}
      </div>
    </section>
  )
}
export default StatusTest
