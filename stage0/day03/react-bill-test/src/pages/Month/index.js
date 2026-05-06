import { useSelector } from 'react-redux'
import { Utensils, Car, Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import dayjs from 'dayjs'
import './index.css'

const categoryMap = {
  food: { label: '餐饮', icon: <Utensils size={20} /> },
  transport: { label: '交通', icon: <Car size={20} /> },
  salary: { label: '工资', icon: <Wallet size={20} /> },
}

const Month = () => {
  const { billList } = useSelector(state => state.bill)

  // 计算本月统计
  const currentMonth = dayjs().format('YYYY-MM')
  const monthlyBills = billList.filter(item => item.date.startsWith(currentMonth))
  
  const income = monthlyBills
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.money, 0)
    
  const pay = monthlyBills
    .filter(item => item.type === 'pay')
    .reduce((sum, item) => sum + item.money, 0)

  return (
    <div className="month-container">
      {/* 头部统计卡片 */}
      <div className="header-card">
        <div className="title">{dayjs().format('YYYY年M月')} 结余</div>
        <div className="balance">¥ {(income - pay).toFixed(2)}</div>
        
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-label">
              <ArrowDownCircle size={12} style={{ marginRight: 4 }} />
              本月收入
            </div>
            <div className="stat-value">¥ {income.toFixed(2)}</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'right' }}>
            <div className="stat-label">
              <ArrowUpCircle size={12} style={{ marginRight: 4 }} />
              本月支出
            </div>
            <div className="stat-value">¥ {pay.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* 账单列表 */}
      <div className="bill-list-section">
        <div className="section-title">账单明细</div>
        {monthlyBills.map(item => (
          <div className="bill-card" key={item.id}>
            <div className="category-icon">
              {categoryMap[item.category]?.icon || <Wallet size={20} />}
            </div>
            <div className="bill-info">
              <div className="bill-title">{item.description}</div>
              <div className="bill-date">{dayjs(item.date).format('MM月DD日 HH:mm')}</div>
            </div>
            <div className={`bill-amount ${item.type}`}>
              {item.type === 'pay' ? '-' : '+'}{item.money.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Month
