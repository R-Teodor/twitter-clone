import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import type { RootState } from '../app/store'

export declare interface AppProps {
  children: React.ReactNode | null
}

function ProtectedRoute({ children }: AppProps) {
  const id = useSelector((state: RootState) => state.auth.email)
  const navigate = useNavigate()
  console.log(id)
  if (!id) return <Navigate to={'explore'} replace />

  // useEffect(() => {
  //   if (!id) {
  //     navigate('/login')
  //   }
  // }, [id])

  return <>{children}</>
}
export default ProtectedRoute
