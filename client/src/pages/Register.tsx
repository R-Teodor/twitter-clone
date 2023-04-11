const Register = () => {
  const req = {
    email: '',
    password: '',
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  const getUsers = async () => {
    fetch('http://localhost:4000/api/v1/auth/getUsers', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }
  return (
    <div>
      <form
        action=''
        className='text-3xl text-white'
        onSubmit={(e) => handleSubmit(e)}
      >
        <fieldset>
          <label htmlFor='user'>Credentials</label>
          <input type='text' id='user' className='text-gray-800' />
        </fieldset>
        <fieldset>
          <label htmlFor='pass'>Pass</label>
          <input type='text' id='pass' className='text-gray-800' />
        </fieldset>

        <button type='submit'>Fetch</button>
        <button type='button' onClick={getUsers}>
          Get Users
        </button>
      </form>
    </div>
  )
}
export default Register
