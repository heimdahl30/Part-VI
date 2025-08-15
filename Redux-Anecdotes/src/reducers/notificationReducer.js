import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Welcome'

const notificationSlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        createNotification (state, action) {
            state = action.payload
            return state
        },

        removeNotification (state, action) {
            state = action.payload
            return state
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(createNotification(content))
        setTimeout(() => {
            dispatch(removeNotification(''))
        }, time * 1000)
    }

}

export default notificationSlice.reducer