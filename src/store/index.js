import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('foodfacts-saved')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const store = configureStore({
  reducer: {
    saved: savedReducer
  },
  preloadedState: {
    saved: {
      items: loadFromStorage()
    }
  }
})

store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem(
      'foodfacts-saved',
      JSON.stringify(state.saved.items)
    )
  } catch {
    // fail silently
  }
})

export default store
