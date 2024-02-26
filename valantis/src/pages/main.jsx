import { useState, useEffect } from "react";
import * as S from "./App.styles";
import {
  useGetCurrentIdsQuery,
  useGetAllItemsMutation,
  useGetFilteredIdsMutation,
} from "../services/appService";
import { ListItem } from "../components/goodItem/goodItem.jsx";
import FilterCategory from "../components/filter/FilterButton.js";
import { Pagination } from "../components/pagination/pagelist.jsx";

export const GoodsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [findData, setFindData] = useState({});
  const [pagesCount, setPagesCount] = useState();
  const [query, setQuery] = useState({
    action: "get_ids",
    params: { offset: 0, limit: 50 },
  });
  const [goods, setGoods] = useState([]);
  // const [query, setQuery] = useState(null)
  // const [ setUrlParams] = useState('')
  // const [modal, setModal] = useState('')
  const [searchIn, setSearchIn] = useState({ title: "логину", in: "login" });

  useEffect(() => {
    if (currentPage) {
      setQuery({
        ...query,
        params: { ...query.params, offset: (currentPage - 1) * perPage },
      });
    }
    // if (perPage) {
    //   setQuery({ ...query, params: { ...query.params, limit: perPage } });
    // }
  }, [currentPage, perPage]);

  const {
    data: ids,
    // isFetching,
    // isLoading,
    // isError,
    // error,
    // isSuccess,
  } = useGetCurrentIdsQuery(query);
  console.log(query);

  const [getItems, items] = useGetAllItemsMutation();
  const [getFilteredIds, filteredIds] = useGetFilteredIdsMutation();

  useEffect(() => {
    if (ids?.result) {
      getFilteredIds({ product: "" });
      setPagesCount(Math.ceil(filteredIds?.data?.result?.length / perPage));
      getItems(ids.result);
    }
  }, [ids]);

  useEffect(() => {
    if (items?.data?.result) {
      setGoods(
        items.data.result.reduce((acc, cur) => {
          if (!acc.find((item) => item.id == cur.id)) {
            acc.push(cur);
          }
          return acc;
        }, [])
      );
    }
  }, [items]);

  console.log(currentPage);
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
    <S.wrapper>
      <S.container>
        <S.main>
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
                    e.stopPropagation();
                    setFindData({ ...findData, q: e.target.value });
                  }}
                />
              </S.centalBlockSearch>
              <S.filterBlock>
                <S.usersPerPage>
                  <span> Искать по </span>
                  <FilterCategory
                    title={searchIn?.title}
                    content={[
                      { title: "логину", in: "login" },
                      { title: "имени", in: "name" },
                      { title: "электронной почте", in: "email" },
                      { title: "везде", in: "" },
                    ]}
                    activeFilter={searchIn?.title}
                    setFilter={setSearchIn}
                  />
                </S.usersPerPage>
                {/* {users && <Filter data={query} setData={setQuery} />} */}
                <S.userFindBtn
                // onClick={() => {
                //   getIds()
                //   // setQuery((prev) => ({ ...prev, ...findData }))
                // }}
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
                    <S.titleCol01>id</S.titleCol01>
                    <S.titleCol02>Название</S.titleCol02>
                    <S.titleCol03>Цена</S.titleCol03>
                    <S.titleCol04>Бренд</S.titleCol04>
                  </S.contentTitle>
                  <S.contentUserList>
                    {/* {isFetching &&
                Array(perPage)
                  .fill()
                  .map(() => <ListItem key={Math.random()} />)} */}
                    {goods?.length &&
                      goods.map((item) => (
                        <ListItem key={item.id} good={item} />
                      ))}
                    {/* // ) : (
              //   <S.filterNotFound>
              //     Пользователей, соответствующих вашему запросу, не найдено
              //     <img
              //       src="img/smile_crying.png"
              //       alt="crying"
              //       style={{ width: 52, height: 52 }}
              //     />
              //   </S.filterNotFound>
              // )} */}
                  </S.contentUserList>
                </>
                {/* )} */}
              </S.centalBlockContent>
            </div>
            {goods && (
              <S.paginationBlock>
                <S.usersPerPage>
                  <span> Выводить по </span>
                  <FilterCategory
                    title={perPage}
                    content={[10, 30, 50, 100]}
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
            )}

            {/* {modal && <UserInfoModal url={modal} closeModal={setModal} />} */}
          </S.mainCentalBlock>
        </S.main>
      </S.container>
    </S.wrapper>
  );
};
