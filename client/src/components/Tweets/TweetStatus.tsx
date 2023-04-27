import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import TweetComponents from './TweetComponents'
import axios, { AxiosPromise, AxiosResponse } from 'axios'
import { ReturnThread } from '../../features/tweets/tweetSlice'

function StatusTest() {
  const { userTag, tweetId } = useParams()
  const { state } = useLocation()
  const [commentInput, setCommentInput] = useState('')
  const [comments, setComments] = useState<ReturnThread[]>([])
  const user = useSelector((state: RootState) => state.auth)
  // console.log(user)
  // console.log(state)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/tweet/replythread/${tweetId}`,
      {
        author: user._id,
        content: commentInput,
      },
      { withCredentials: true }
    )
    console.log(data)
  }

  useEffect(() => {
    const populateCommentSection = async () => {
      const { data }: AxiosResponse<ReturnThread[]> = await axios.get(
        `http://localhost:4000/api/v1/tweet/replythread/${tweetId}`,
        { withCredentials: true }
      )
      console.log(data)
      setComments(data)
    }

    if (!state)
      console.log(
        `Going to fetch tweet by using tweetID: ${tweetId} and userTag: ${userTag}`
      )
    populateCommentSection()
  }, [state])

  return (
    <section className='flex flex-col'>
      <header className='px-6'>
        <div className='text-3xl'>Tweet</div>
        <div>{state?.author.name}</div>
        <div>@{state?.author.userTag}</div>
        <br />
        <div>{state?.content}</div>
        {state?.mediaUrl && <img src={state.mediaUrl} alt='' />}

        <div>{state?.createdAt}</div>
      </header>

      <form className='pl-4' onSubmit={handleSubmit}>
        <textarea
          name=''
          id=''
          cols={50}
          rows={5}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className='text-xl text-slate-900 p-4'
        />
        <button>tweet</button>
      </form>
      <div>
        {comments.map((item) => (
          <TweetComponents tweet={item} key={item._id} />
        ))}
      </div>
    </section>
  )
}
export default StatusTest
