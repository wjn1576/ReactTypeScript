import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import './index.css'

const Year = () => {
  const { billList } = useSelector(state => state.bill)
  const currentYear = dayjs().format('YYYY')

  // 1. 计算年度总额
  const yearlyBills = billList.filter(item => item.date.startsWith(currentYear))
  const totalIncome = yearlyBills
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.money, 0)
  const totalExpense = yearlyBills
    .filter(item => item.type === 'pay')
    .reduce((sum, item) => sum + item.money, 0)

  // 2. 按月进行分组统计 (1-12月)
  const monthData = Array.from({ length: 12 }, (_, i) => {
    const monthStr = `${currentYear}-${String(i + 1).padStart(2, '0')}`
    const bills = yearlyBills.filter(item => item.date.startsWith(monthStr))
    const income = bills.filter(item => item.type === 'income').reduce((sum, item) => sum + item.money, 0)
    const expense = bills.filter(item => item.type === 'pay').reduce((sum, item) => sum + item.money, 0)
    return { month: i + 1, income, expense }
  })

  // 找到最大值用于比例计算
  const maxAmount = Math.max(...monthData.map(d => Math.max(d.income, d.expense)), 100)

  return (
    <div className="year-container">
      {/* 头部年度概览 */}
      <div className="year-header">
        <div className="year-title">{currentYear} 年度总结</div>
        <div className="year-amount">¥ {(totalIncome - totalExpense).toFixed(2)}</div>
        <div className="year-stats">
          <div className="year-stat-item">
            <div className="label">年收入</div>
            <div className="value">¥ {totalIncome.toFixed(0)}</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }}></div>
          <div className="year-stat-item">
            <div className="label">年支出</div>
            <div className="value">¥ {totalExpense.toFixed(0)}</div>
          </div>
        </div>
      </div>

      {/* 月度趋势对比 */}
      <div className="month-compare-section">
        <div className="section-title">月度收支对比</div>
        {monthData.map(item => (
          (item.income > 0 || item.expense > 0) ? (
            <div className="month-bar-item" key={item.month}>
              <div className="month-info">
                <span>{item.month}月</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  入 {item.income} / 支 {item.expense}
                </span>
              </div>
              <div className="bar-container">
                <div 
                  className="bar-income" 
                  style={{ width: `${(item.income / maxAmount) * 100}%` }}
                ></div>
                <div 
                  className="bar-expense" 
                  style={{ width: `${(item.expense / maxAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : null
        ))}
        {yearlyBills.length === 0 && <div className="empty-tip">暂无年度数据</div>}
      </div>

      {/* 底部装饰 */}
      <div className="category-stats-section">
        <div className="section-title">收支占比说明</div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          年度统计基于您在 {currentYear} 年内记录的所有账单。绿色条代表收入，淡红色代表支出。建议您保持记账习惯，以获得更准确的财务洞察。
        </p>
      </div>
    </div>
  )
}

export default Year
