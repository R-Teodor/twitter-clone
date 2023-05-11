import { useState } from 'react'
import axios from 'axios'

const Notifications = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<File>()
  const [selectedBGImage, setSelectedBGImage] = useState<File>()
  const [imgAvatarPath, setImgAvatarPath] = useState('')
  const [imgBGPath, setImgBGPath] = useState('')

  const handleMultiform = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const form = {
      name: 'First multipart req',
      bio: 'Some long lines of text',
      location: 'Los Angeles',
      website: 'url23321',
    }
    const dataForm = new FormData()

    if (selectedAvatar) dataForm.append('avatar', selectedAvatar)
    if (selectedBGImage) dataForm.append('bgImage', selectedBGImage)

    dataForm.append('text', 'First multipart req')
    Object.keys(form).forEach((key) =>
      dataForm.append(key, form[key as keyof typeof form])
    )

    const { data } = await axios.post(
      'http://localhost:4000/api/v1/user/edit',
      dataForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
    console.log(data)
    setImgAvatarPath(data.avatarPath)
    setImgBGPath(data.bgPath)
  }
  return (
    <div>
      Notifications
      <div className='py-6 '>
        <label htmlFor='avatar'>Avatar Image</label>
        <input
          type='file'
          name='avatar'
          id='media'
          onChange={(e) => {
            if (e.target.files) {
              console.log(typeof e.target.files[0])
              setSelectedAvatar(e.target.files[0])
            }
          }}
        />

        <div className='py-2'>
          {selectedAvatar && (
            <img
              src={URL.createObjectURL(selectedAvatar)}
              alt=''
              width={'250px'}
              height={'250px'}
              className='rounded-full'
            />
          )}
        </div>
      </div>
      <div className='py-6 '>
        <label htmlFor='bgImg'>BGIMG</label>
        <input
          type='file'
          name='bgImg'
          id='media'
          onChange={(e) => {
            if (e.target.files) {
              console.log(typeof e.target.files[0])
              setSelectedBGImage(e.target.files[0])
            }
          }}
        />

        <div className='py-2'>
          {selectedBGImage && (
            <img
              src={URL.createObjectURL(selectedBGImage)}
              alt=''
              width={'250px'}
              height={'250px'}
              className='rounded-full'
            />
          )}
        </div>
      </div>
      <div className='p-8'>
        <button onClick={handleMultiform}>Send multiform</button>
      </div>
      <div className='py-6 h-44 w-full'>
        <img src={imgAvatarPath} alt='' className='w-full h-full' />
      </div>
      <div className='py-6 h-44 w-full'>
        <img src={imgBGPath} alt='' className='w-full h-full' />
      </div>
    </div>
  )
}
export default Notifications
