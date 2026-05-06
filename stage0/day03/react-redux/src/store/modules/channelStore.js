import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
    name: 'channel',
    initialState: {
        channelList: []
    },
    reducers: {
        setChannels(state, action) {
            state.channelList = action.payload
        }
    }
})

// 解构出来actionCreater函数
const { setChannels } = channelStore.actions

// 封装异步请求函数
const url = 'http://geek.itheima.net/v1_0/channels'
const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios.get(url)
        dispatch(setChannels(res.data.data.channels))
    }
}

export { fetchChannelList }
export default channelStore.reducer
