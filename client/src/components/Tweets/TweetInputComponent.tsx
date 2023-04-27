import { HiGif, HiCalendar, HiPhoto } from 'react-icons/hi2'
import { HiEmojiHappy, HiChartBar, HiLocationMarker } from 'react-icons/hi'
import { useState } from 'react'

function TweetInputComponent() {
  const [textareaField, setTextareaField] = useState('')

  return (
    <header className='flex flex-col w-full py-3 pb-2 border-b-[1px] border-slate-500 border-opacity-40'>
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
          placeholder="What's happening"
          className='text-2xl bg-transparent outline-none flex-grow flex-shrink-0 resize-none '
          rows={2}
          maxLength={245}
          value={textareaField}
          onChange={(e) => setTextareaField(e.target.value)}
        />
      </div>
      <div className='flex justify-between pr-5 pl-20'>
        <nav className='flex gap-4 text-blue-400'>
          <span>
            <HiPhoto size={20} />
          </span>
          <span>
            <HiGif size={20} />
          </span>
          <span>
            <HiChartBar size={20} />
          </span>
          <span>
            <HiEmojiHappy size={20} />
          </span>
          <span>
            <HiCalendar size={20} />
          </span>
          <span>
            <HiLocationMarker size={20} />
          </span>
        </nav>
        <button className='bg-[#1D9BF0] font-bold rounded-3xl py-1.5 px-4'>
          Tweet
        </button>
      </div>
    </header>
  )
}
export default TweetInputComponent
