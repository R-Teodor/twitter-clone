import { Outlet } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import TrendsForYou from '../components/TrendsForYou'

const MainContent = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const divEl = scrollRef.current
  //   if (divEl)
  //     divEl.addEventListener('scroll', () => {
  //       console.log(divEl.scrollTop)
  //     })
  // }, [])
  return (
    // className='flex-shrink flex-grow max-h-screen overflow-y-scroll'
    <main className='flex-shrink flex-grow' ref={scrollRef}>
      {/* [990px] former value , should check when doing mobile responsive */}
      <div className='w-[990px] flex gap-5 h-full'>
        <div className='w-[600px] h-full'>
          {/* Added h-full */}
          <div className='border-[1px] border-slate-500 border-opacity-40 w-full h-full'>
            <Outlet />
          </div>
        </div>
        <div className='w-[350px] flex-shrink'>
          <TrendsForYou />
        </div>
      </div>
    </main>
  )
}
export default MainContent
