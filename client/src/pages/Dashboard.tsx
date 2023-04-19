import SidebarHeader from '../components/SidebarHeader'
import MainContent from './MainContent'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkLoginState } from '../features/user/authSlice'
import type { AppDispatch, RootState } from '../app/store'

const Dashboard = () => {
  const id = useSelector((state: RootState) => state.auth.userTag)
  const loading = useSelector((state: RootState) => state.auth.loading)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!id) {
      dispatch(checkLoginState())
    }
  }, [id])

  if (loading == 'loading')
    return <div className='text-5xl text-red-600'>Loading Time.....</div>
  return (
    <div className='text-white flex min-h-screen '>
      <SidebarHeader userTag={id} />
      <MainContent />
    </div>
  )
}
export default Dashboard
