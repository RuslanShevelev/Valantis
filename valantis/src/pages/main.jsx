import { useState,  } from 'react'
import * as S from './App.styles'
import { usePostIdsMutation } from '../services/appService'


export const GoodsList = () => {
      
  const [findData, setFindData] = useState({})
  // const [query, setQuery] = useState(null)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [perPage] = useState(10)
  // const [ setUrlParams] = useState('')
  // const [modal, setModal] = useState('')
  // const [searchIn] = useState({ title: 'логину', in: 'login' })

  // useEffect(() => {
  //   if (query) {
  //     const newParams = new URLSearchParams([...Object.entries(query)])
  //     newParams.append('page', currentPage)
  //     newParams.append('per_page', perPage)
  //     if (searchIn?.in) {
  //       newParams.set('q', `${query.q} in:${searchIn.in}`)
  //     }
  //     setUrlParams(newParams.toString())
  //   }
  // }, [query, currentPage, perPage, searchIn])


  const [getIds, result] = usePostIdsMutation()

console.log(result);

  // const {
  //   data: users,
  //   isFetching,
  //   isLoading,
  //   isError,
  //   error,
  //   isSuccess,
  // } = useGetAllUsersQuery(urlParams)

  // const pagesCount = users ? Math.ceil(users.total_count / perPage) : null

  return ( 
    <S.mainCentalBlock>
    <div>
      <S.centalBlockSearch className="search">
        <S.searchSvg>
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </S.searchSvg>
        <S.searchText
          className="search__text"
          type="search"
          placeholder="Поиск"
          name="search"
          onChange={(e) => {
            e.stopPropagation()
            setFindData({ ...findData, q: e.target.value })
          }}
        />
      </S.centalBlockSearch>
      <S.filterBlock>
        {' '}
        {/* <S.usersPerPage>
          <span> Искать по </span>
          <FilterCategory
            title={searchIn?.title}
            content={[
              { title: 'логину', in: 'login' },
              { title: 'имени', in: 'name' },
              { title: 'электронной почте', in: 'email' },
              { title: 'везде', in: '' },
            ]}
            activeFilter={searchIn?.title}
            setFilter={setSearchIn}
          />
        </S.usersPerPage> */}
        {/* {users && <Filter data={query} setData={setQuery} />} */}
        <S.userFindBtn
          onClick={() => {
            getIds()
            // setQuery((prev) => ({ ...prev, ...findData }))
          }}
        >
          Найти
        </S.userFindBtn>
      </S.filterBlock>
      <S.centalBlockContent>
        {/* {isLoading && (
          <S.loaderWrap>
            <RotatingLines visible strokeColor="#b672ff" />
          </S.loaderWrap>
        )}
        {isError && error.status !== 422 && (
          <div style={{ color: 'red' }}>
            Не удалось загрузить пользователей, попробуйте позже:{' '}
            {error.status}
          </div>
        )}
        {isSuccess && ( */}
          <>
            <S.contentTitle>
              <S.titleCol01>avatar & login</S.titleCol01>
              <S.titleCol02>page on GitHub</S.titleCol02>
              <S.titleCol04>details</S.titleCol04>
            </S.contentTitle>
            <S.contentUserList>
              {/* {isFetching &&
                Array(perPage)
                  .fill()
                  .map(() => <ListItem key={Math.random()} />)}
              {users?.items?.length ? (
                users.items.map((user) => (
                  <ListItem key={user?.id} user={user} setModal={setModal} />
                ))
              ) : (
                <S.filterNotFound>
                  Пользователей, соответствующих вашему запросу, не найдено
                  <img
                    src="img/smile_crying.png"
                    alt="crying"
                    style={{ width: 52, height: 52 }}
                  />
                </S.filterNotFound>
              )} */}
            </S.contentUserList>
          </>
        {/* )} */}
      </S.centalBlockContent>
    </div>
    {/* {users?.items?.length && (
      <S.paginationBlock>
        <S.usersPerPage>
          <span> Выводить по </span>
          <FilterCategory
            title={perPage}
            content={[10, 20, 30, 40]}
            pop="up"
            activeFilter={perPage}
            setFilter={setPerPage}
          />
        </S.usersPerPage>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </S.paginationBlock>
    )} */}

    {/* {modal && <UserInfoModal url={modal} closeModal={setModal} />} */}
  </S.mainCentalBlock>
  )
    
}

