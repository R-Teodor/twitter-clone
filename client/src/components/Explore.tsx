import type { RootState, AppDispatch } from '../app/store'
import type { UserCredentials } from '../features/user/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAllUsers,
  login,
  checkLoginState,
} from '../features/user/authSlice'

const req: UserCredentials = {
  email: 'teodor@gmail.com',
  password: 'secret1234',
}

const Explore = () => {
  const userId = useSelector((state: RootState) => state.auth._id)
  const userName = useSelector((state: RootState) => state.auth.name)
  const user = useSelector((state: RootState) => state.auth)
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
      </div>
    </div>
  )
}
export default Explore
