import SidebarHeader from '../components/SidebarHeader'
import MainContent from './MainContent'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkLoginState } from '../features/user/authSlice'
import type { AppDispatch, RootState } from '../app/store'
import { useState } from 'react'
import { EditProfile } from '../components/ProfileContent/EditProfile'
import LoginModal from '../components/Authentication/LoginModal'

const Dashboard = () => {
  const user = useSelector((state: RootState) => {
    return {
      userTag: state.auth.userTag,
      name: state.auth.name,
      avatar: '',
    }
  })
  // const isOpenProfile = useSelector(
  //   (state: RootState) => state.layer.profileModal.isOpen
  // )
  const { profileModal, loginModal } = useSelector(
    (state: RootState) => state.layer
  )

  const loading = useSelector((state: RootState) => state.auth.loading)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!user.userTag) {
      dispatch(checkLoginState())
    }
  }, [user.userTag])

  if (loading == 'loading')
    return <div className='text-5xl text-red-600'>Loading Time.....</div>
  return (
    <div className='text-white flex min-h-screen '>
      {loginModal.isOpen && <LoginModal />}
      {profileModal.isOpen && <EditProfile isOpen={profileModal.isOpen} />}
      <SidebarHeader user={user} />
      <MainContent />
    </div>
  )
}

export default Dashboard
