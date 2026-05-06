import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [
      { id: '1', type: 'pay', money: 15.5, category: 'food', date: '2026-04-27 10:00:00', description: '早餐' },
      { id: '2', type: 'pay', money: 50, category: 'transport', date: '2026-04-27 14:00:00', description: '打车' },
      { id: '3', type: 'income', money: 5000, category: 'salary', date: '2026-04-01 09:00:00', description: '工资' },
    ]
  },
  reducers: {
    addBill(state, action) {
      state.billList.push({
        ...action.payload,
        id: Date.now().toString(),
        date: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }
  }
})

const { addBill } = billStore.actions
const billReducer = billStore.reducer

export { addBill }
export default billReducer
