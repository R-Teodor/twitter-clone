import { HiGif, HiCalendar, HiPhoto } from 'react-icons/hi2'
import { HiEmojiHappy, HiChartBar, HiLocationMarker } from 'react-icons/hi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTweetThread } from '../../features/tweets/tweetSlice'
import type { AppDispatch } from '../../app/store'
import axios from 'axios'

export type InputType = 'Tweet' | 'Reply'
type ComponentProps = {
  componentType: InputType
  tweetId?: string | undefined
}

function TweetInputComponent({ componentType, tweetId }: ComponentProps) {
  const [file, setFile] = useState<File>()
  const [textareaField, setTextareaField] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleReplySubmit = async () => {
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/tweet/replythread/${tweetId}`,
      {
        content: textareaField,
      },
      { withCredentials: true }
    )
    console.log(data)
  }

  const handleSubmit = async () => {
    const thread = {
      content: textareaField,
      media: file,
    }
    if (componentType == 'Tweet') await dispatch(createTweetThread(thread))
    if (componentType == 'Reply') {
      await handleReplySubmit()
    }
  }
  return (
    <header className='flex flex-col w-full py-3 pb-2 '>
      <div className='flex flex-col gap-4'>
        <div className='px-3  flex gap-5'>
          <div className='w-12 h-12 overflow-hidden rounded-full'>
            <img
              src='https://placehold.co/100x100'
              alt=''
              className='w-full object-contain object-center'
            />
          </div>
          <textarea
            // type='textarea'
            placeholder={
              componentType == 'Reply' ? 'Tweet your Reply' : 'Whats Hapening'
            }
            className='text-2xl bg-transparent outline-none flex-grow flex-shrink-0 resize-none '
            rows={2}
            maxLength={245}
            value={textareaField}
            onChange={(e) => setTextareaField(e.target.value)}
          />
        </div>

        {file && (
          <div className='px-6 py-4 w-full h-full'>
            <img
              src={URL.createObjectURL(file)}
              className='object-cover w-full h-full'
            />
          </div>
        )}
      </div>
      <div className='flex justify-between pr-5 pl-20'>
        <nav className='flex gap-4 text-blue-400'>
          <label htmlFor='media' className='cursor-pointer'>
            <HiPhoto size={20} />
          </label>
          <input
            type='file'
            name=''
            id='media'
            className='hidden'
            onChange={handleFileInput}
          />

          <span className='cursor-pointer'>
            <HiGif size={20} />
          </span>
          {componentType == 'Tweet' && (
            <span className='cursor-pointer'>
              <HiChartBar size={20} />
            </span>
          )}

          <span className='cursor-pointer'>
            <HiEmojiHappy size={20} />
          </span>
          {componentType == 'Tweet' && (
            <span className='cursor-pointer'>
              <HiCalendar size={20} />
            </span>
          )}

          <span aria-disabled={true} className='cursor-pointer'>
            <HiLocationMarker size={20} />
          </span>
        </nav>

        <button
          className='bg-[#1D9BF0] font-bold rounded-3xl py-1.5 px-4'
          onClick={handleSubmit}
        >
          {componentType == 'Tweet' ? 'Tweet' : 'Reply'}
        </button>
      </div>
    </header>
  )
}
export default TweetInputComponent
