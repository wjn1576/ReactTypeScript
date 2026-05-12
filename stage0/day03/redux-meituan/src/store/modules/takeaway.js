import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        // 商品列表
        foodsList: [],
        // 当前激活的菜单索引
        activeIndex: 0,
        // 搜索关键词
        searchKeyword: '',
        // 购物车列表
        cartList: []
    },
    reducers: {
        setFoodsList (state, action) {
            state.foodsList = action.payload
        },
        changeActiveIndex (state, action) {
            state.activeIndex = action.payload
        },
        setSearchKeyword (state, action) {
            state.searchKeyword = action.payload
        },
        addToCart (state, action) {
            // 查找购物车中是否已有该商品
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push({ ...action.payload, count: 1 })
            }
        },
        increaseCount (state, action) {
            const item = state.cartList.find(item => item.id === action.payload)
            if (item) item.count++
        },
        decreaseCount (state, action) {
            const item = state.cartList.find(item => item.id === action.payload)
            if (item) {
                if (item.count === 1) {
                    state.cartList = state.cartList.filter(i => i.id !== action.payload)
                } else {
                    item.count--
                }
            }
        },
        clearCart (state) {
            state.cartList = []
        }
    }
})

// 异步获取部分
const { setFoodsList, changeActiveIndex, setSearchKeyword, addToCart, increaseCount, decreaseCount, clearCart } = foodsStore.actions

const fetchFoodsList = () => {
    return async (dispatch) => {
        // 编写异步逻辑
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodsList, changeActiveIndex, setSearchKeyword, addToCart, increaseCount, decreaseCount, clearCart }
export default foodsStore.reducer