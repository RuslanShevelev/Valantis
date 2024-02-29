import { useState, useEffect } from 'react'
import FilterCategory from './FilterButton'
import * as S from './filter.styles'

export default function Filter({data, setData}) {
  const [selectedFilter, setSelectedFilter] = useState({sort: '', title: 'умолчанию'})
  const [order, setOrder] = useState({title: 'по убыванию', order: 'desc'})
useEffect(() => {
  if(selectedFilter.sort){setData({...data, sort: selectedFilter.sort, order: order.order})}
 else {const newObj = data
  delete newObj.sort
  delete newObj.order
  setData({...newObj})}
}, [selectedFilter, order])

  return (
    <S.centerblockFilter>
      <S.filterTitle>Сортировка по:</S.filterTitle>
      <FilterCategory 
        title={selectedFilter?.title}
        content={[
          {title: 'умолчанию', sort: ''},
          {title: 'количеству подписчиков', sort: 'followers'},
          {title: 'количеству репозиториев', sort: 'repositories'},
          {title: 'дате присоединения', sort: 'joined'}
        ]}
        activeFilter={selectedFilter?.title}
        setFilter={setSelectedFilter}
      />
{selectedFilter?.title !== 'умолчанию' &&      <FilterCategory
        title={order?.title}
        content={[{title: 'по убыванию', order: 'desc'}, {title: 'по возрастанию', order: 'asc'}]}
        activeFilter={order?.title}
        setFilter={setOrder}
      />}
    </S.centerblockFilter>
  )
}
