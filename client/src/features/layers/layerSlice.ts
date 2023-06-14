import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Layers {
  profileModal: {
    isOpen: boolean
  }
  loginModal: {
    isOpen: boolean
  }
}
const initialState: Layers = {
  profileModal: {
    isOpen: false,
  },
  loginModal: {
    isOpen: false,
  },
}

const layerSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    toggleProfileModal: (state, action: PayloadAction<'Open' | 'Close'>) => {
      if (action.payload == 'Open') state.profileModal.isOpen = true
      if (action.payload == 'Close') state.profileModal.isOpen = false
    },
    toggleLoginModal: (state, action: PayloadAction<'Open' | 'Close'>) => {
      if (action.payload == 'Open') state.loginModal.isOpen = true
      if (action.payload == 'Close') state.loginModal.isOpen = false
    },
  },
})

export const { toggleProfileModal, toggleLoginModal } = layerSlice.actions
export default layerSlice.reducer
