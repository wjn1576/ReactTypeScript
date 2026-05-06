import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ChevronLeft, Utensils, Car, Wallet, ShoppingBag, Coffee, Home, Zap } from 'lucide-react'
import classNames from 'classnames'
import { addBill } from '../../store/modules/billStore'
import './index.css'

const categories = {
  pay: [
    { type: 'food', name: '餐饮', icon: <Utensils /> },
    { type: 'transport', name: '交通', icon: <Car /> },
    { type: 'shopping', name: '购物', icon: <ShoppingBag /> },
    { type: 'coffee', name: '零食', icon: <Coffee /> },
    { type: 'home', name: '租房', icon: <Home /> },
    { type: 'water', name: '水电', icon: <Zap /> },
  ],
  income: [
    { type: 'salary', name: '工资', icon: <Wallet /> },
    { type: 'bonus', name: '奖金', icon: <Zap /> },
  ]
}

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [billType, setBillType] = useState('pay') // pay / income
  const [money, setMoney] = useState('')
  const [category, setCategory] = useState('food')
  const [description, setDescription] = useState('')

  const handleSave = () => {
    if (!money || isNaN(money)) return alert('请输入有效金额')
    
    dispatch(addBill({
      type: billType,
      money: Number(money),
      category,
      description: description || categories[billType].find(c => c.type === category)?.name
    }))
    
    navigate('/')
  }

  return (
    <div className="new-container">
      <div className="new-header">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </div>
        <div className="new-title">记一笔</div>
      </div>

      <div className="type-switcher">
        <div 
          className={classNames('type-btn', { active: billType === 'pay' })}
          onClick={() => { setBillType('pay'); setCategory('food') }}
        >
          支出
        </div>
        <div 
          className={classNames('type-btn', { active: billType === 'income' })}
          onClick={() => { setBillType('income'); setCategory('salary') }}
        >
          收入
        </div>
      </div>

      <div className="amount-input-box">
        <input 
          className="amount-input"
          placeholder="0.00"
          type="number"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          autoFocus
        />
      </div>

      <div className="category-section">
        <div className="category-grid">
          {categories[billType].map(item => (
            <div 
              key={item.type}
              className={classNames('category-item', { active: category === item.type })}
              onClick={() => setCategory(item.type)}
            >
              <div className="category-icon-box">
                {item.icon}
              </div>
              <span className="category-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-item">
        <span className="label">备注</span>
        <input 
          className="input"
          placeholder="写点什么..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="save-btn" onClick={handleSave}>
        保存账单
      </div>
    </div>
  )
}

export default New
