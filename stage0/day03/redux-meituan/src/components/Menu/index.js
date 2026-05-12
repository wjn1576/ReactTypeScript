import { useDispatch, useSelector } from 'react-redux'
import { changeActiveIndex } from '../../store/modules/takeaway'
import classNames from 'classnames'
import './index.scss'

const Menu = () => {
  const { foodsList, activeIndex } = useSelector(state => state.foods)
  const dispatch = useDispatch()

  const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }))
  return (
    <nav className="list-menu">
      {/* 动态控制激活类名：activeIndex === index 时添加 active */}
      {menus.map((item, index) => {
        return (
          <div
            key={item.tag}
            onClick={() => dispatch(changeActiveIndex(index))}
            className={classNames(
              'list-menu-item',
              { active: activeIndex === index }
            )}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
