import { useDispatch, useSelector } from 'react-redux'
import { setSearchKeyword } from '../../store/modules/takeaway'
import './index.scss'

const NavBar = () => {
  const { searchKeyword } = useSelector(state => state.foods)
  const dispatch = useDispatch()

  return (
    <nav className="nav">
      <div className="menu">
        <div className="menu-item active">
          点菜<span className="menu-active-bar"></span>
        </div>
        <div className="menu-item">
          评价<span className="menu-comment">1796</span>
        </div>
        <div className="menu-item">商家</div>
      </div>

      <div className="menu-search">
        <div className="menu-form">
          <div className="menu-search-icon"></div>
          <input
            className="menu-search-input"
            type="text"
            placeholder="请输入菜品名称"
            value={searchKeyword}
            onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
          />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
