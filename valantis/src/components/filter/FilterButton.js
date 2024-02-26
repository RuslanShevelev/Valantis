import { useState } from 'react'
import * as S from './filterButton.styles'

export default function FilterCategory({
  title,
  content,
  setFilter,
  activeFilter,
  selected,
  pop,
}) {
  const [active, setActive] = useState(false)
  const toggleVisibility = () => setActive(!active)
  return (
    <S.filterCategory>
      <S.filterButton
        type="button"
        $active={(title !== 'умолчанию') && (title !== 10) && (title !== 'логину')}
        onClick={toggleVisibility}
      >
        {title}
      </S.filterButton>
      {selected > 0 && (
        <S.selectedFilterItems>{selected}</S.selectedFilterItems>
      )}
      {active && (
        <S.filterPopup $mode={pop}>
          <S.filterList>
            {content.map((item) => (
              <S.filterItem
                key={item.title ?? item}
                onClick={() => {
                  // if (item.title) {
                    setFilter(item)
                  // } else {
                  //   setFilter(item)
                  // }
                  setActive(false)
                }}
                $isSelected={
                  activeFilter === (item?.title || item)
                }
              >
                {item.title ?? item}
              </S.filterItem>
            ))}
          </S.filterList>
        </S.filterPopup>
      )}
    </S.filterCategory>
  )
}
