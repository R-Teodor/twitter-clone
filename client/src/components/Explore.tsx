import type { RootState, AppDispatch } from '../app/store'
import type { UserFormState } from '../features/user/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
  getState,
  setUserId,
  setUserName,
  fetchAllUsers,
  login,
  checkLoginState,
} from '../features/user/authSlice'

const req: UserFormState = {
  email: '',
  password: 'secret1234',
}

const Explore = () => {
  const userId = useSelector((state: RootState) => state.auth.userId)
  const userName = useSelector((state: RootState) => state.auth.name)
  const user = useSelector((state: RootState) => state.auth.users)
  const dispatch = useDispatch<AppDispatch>()

  const id = localStorage.getItem('id')
  console.log(id)

  const handleFetch = () => {
    fetch('http://localhost:4000/api/v1/auth/getUsers', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <h1>Explore</h1>
      <div className='flex flex-col gap-9'>
        <button onClick={() => dispatch(fetchAllUsers())}>Fetch</button>
        <button onClick={() => dispatch(login(req))}>Fetch Login</button>
        <button onClick={() => dispatch(checkLoginState())}>
          Fetch checkLoginState(getUser)
        </button>
        <button onClick={() => dispatch(getState())}>Dispatch getState</button>
        <button onClick={() => dispatch(setUserId('125345'))}>
          Dispatch setUserId
        </button>
        <button onClick={() => dispatch(setUserName('dobby'))}>
          Dispatch setUserName
        </button>
      </div>
    </div>
  )
}
export default Explore
