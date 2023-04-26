import { useState } from 'react'

const Notifications = () => {
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null)

  return (
    <div>
      Notifications
      <label htmlFor='media'>Attach File</label>
      <input
        type='file'
        name='media'
        id='media'
        onChange={(e) => {
          if (e.target.files) {
            console.log(e.target.files[0])
            setSelectedMedia(e.target.files[0])
          }
        }}
      />
      <br />
      <br />
      <br />
      {selectedMedia?.name}
      {selectedMedia && (
        <img src={URL.createObjectURL(selectedMedia)} alt='' width={'250px'} />
      )}
    </div>
  )
}
export default Notifications
