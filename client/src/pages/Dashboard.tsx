import SidebarHeader from '../components/SidebarHeader'
import MainContent from './MainContent'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkLoginState } from '../features/user/authSlice'
import type { AppDispatch, RootState } from '../app/store'
import { useState } from 'react'

const Dashboard = () => {
  const id = useSelector((state: RootState) => state.auth.userTag)
  const loading = useSelector((state: RootState) => state.auth.loading)
  const dispatch = useDispatch<AppDispatch>()
  const [openModal, setOpenModal] = useState<boolean>(true)

  useEffect(() => {
    if (!id) {
      dispatch(checkLoginState())
    }
  }, [id])

  if (loading == 'loading')
    return <div className='text-5xl text-red-600'>Loading Time.....</div>
  return (
    <div className='text-white flex min-h-screen '>
      <Modal visible={openModal} setState={setOpenModal} />
      <SidebarHeader userTag={id} />
      <MainContent />
    </div>
  )
}
const Modal = ({
  visible,
  setState,
}: {
  visible: boolean
  setState: React.Dispatch<boolean>
}) => {
  const modalClass = visible ? 'fixed h-full w-full bg-red-600 z-50' : 'hidden'
  return (
    <div className={modalClass}>
      <h1 className='text-cyan-300 ' onClick={() => setState(false)}>
        MODAL
      </h1>
    </div>
  )
}
export default Dashboard
