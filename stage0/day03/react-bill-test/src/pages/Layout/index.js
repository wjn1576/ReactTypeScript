import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, PieChart } from 'lucide-react'
import classNames from 'classnames'
import './index.css'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 1. 菜单数据列表（实现一一对应）
  const menuList = [
    { path: '/', icon: LayoutDashboard, label: '月度账单' },
    { path: '/year', icon: PieChart, label: '年度统计' }
  ]

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>

      <div className="tabbar">
        {/* 2. 循环渲染普通菜单 */}
        {menuList.map(item => (
          <div 
            key={item.path}
            className={classNames('tab-item', { active: location.pathname === item.path })} 
            onClick={() => navigate(item.path)}
          >
            <item.icon 
              size={22} 
              strokeWidth={location.pathname === item.path ? 2.5 : 2} 
            />
            <span>{item.label}</span>
          </div>
        ))}
        
        {/* 特殊处理的新增按钮（通常不在循环里，因为它样式特殊） */}
        <div className="tab-item add-btn" onClick={() => navigate('/new')}>
          <PlusCircle size={30} />
        </div>
      </div>
    </div>
  )
}

export default Layout
