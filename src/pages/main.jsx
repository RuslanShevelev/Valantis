import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce.js";
import * as S from "./App.styles";
import {
  useGetCurrentIdsQuery,
  useGetFieldsValueQuery,
  useGetAllItemsMutation,
  useGetFilteredIdsQuery,
} from "../services/appService";
import { RotatingLines } from "react-loader-spinner";
import { ListItem } from "../components/goodItem/goodItem.jsx";
import FilterCategory from "../components/filter/FilterButton.js";
import { Pagination } from "../components/pagination/pagelist.jsx";

export const GoodsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [pagesCount, setPagesCount] = useState(null);
  const [findData, setFindData] = useState({ product: "" });
  const [query, setQuery] = useState({
    action: "get_ids",
    params: { offset: 0, limit: 50 },
  });
  const [goods, setGoods] = useState([]);
  const [filter, setFilter] = useState(false);

  const [getItems, items] = useGetAllItemsMutation();
  const { data: filteredIds } = useGetFilteredIdsQuery(findData);
  const debouncedSearch = useDebounce(setFindData, 1500);

  useEffect(() => {
    if ((!filter && (currentPage) || perPage)) {
      setQuery({
        ...query,
        params: {
          ...query.params,
          offset: (currentPage - 1) * perPage,
          limit: perPage,
        } 
      });
    } else return
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage, filter]);

  useEffect(() => {
    if (findData.product !== "" || findData.price || findData.brand) {
      setFilter(true);
    } else {
      setFilter(false);
    }
    setCurrentPage(1);
  }, [findData]);

  const { data: ids, isLoading: gettingIds } = useGetCurrentIdsQuery(query);

  const { data: brands } = useGetFieldsValueQuery({
    action: "get_fields",
    params: { field: "brand" },
  });
  const { data: prices } = useGetFieldsValueQuery({
    action: "get_fields",
    params: { field: "price" },
  });
  useEffect(() => {
    if (filteredIds?.result)
      setPagesCount(Math.ceil(filteredIds?.result?.length / perPage));
  }, [filteredIds, perPage]);

  useEffect(() => {
    if (filter && filteredIds?.result) {
      getItems(
        filteredIds?.result.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage
        )
      );
    }
    if (!filter && ids?.result) {
      getItems(ids?.result);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, filteredIds]);

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

  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <S.mainCentalBlock>
            <div>
              <S.centalBlockSearch>
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9276 12.7748L15.37 17.0644"
                    stroke="white"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="8.48533"
                    cy="8.48526"
                    r="5.5"
                    transform="rotate(-38.7469 8.48533 8.48526)"
                    stroke="white"
                  />
                </svg>
                <S.searchText
                  type="search"
                  placeholder="Поиск по названию товара"
                  name="search"
                  onChange={(e) => {
                    debouncedSearch({ product: e.target.value });
                  }}
                />
              </S.centalBlockSearch>
              <S.filterBlock>
                <S.goodsPerPage>
                  <span style={{ color: "white" }}> Фильтровать по </span>
                  <FilterCategory
                    title={findData.price ?? "Цене"}
                    content={Array.from(new Set(prices?.result)).sort(
                      (a, b) => a - b
                    )}
                    activeFilter={findData?.price}
                    setFilter={(e) => {
                      setFindData({ price: e });
                    }}
                  />
                  <FilterCategory
                    title={findData.brand ?? "Бренду"}
                    content={Array.from(new Set(brands?.result)).sort()}
                    activeFilter={findData?.brand}
                    setFilter={(e) => {
                      setFindData({ brand: e });
                    }}
                  />
                </S.goodsPerPage>
                {filter && (
                  <S.filterBtn onClick={() => setFindData({ product: "" })}>
                    Все товары
                  </S.filterBtn>
                )}
              </S.filterBlock>
              <S.centalBlockContent>
                {gettingIds || items.isLoading ? (
                  <S.loaderWrap>
                    <RotatingLines visible strokeColor="#b672ff" />
                  </S.loaderWrap>
                ) : goods?.length ? (
                  <>
                    <S.contentTitle>
                      <S.titleCol01>id</S.titleCol01>
                      <S.titleCol02>Название</S.titleCol02>
                      <S.titleCol03>Цена</S.titleCol03>
                      <S.titleCol04>Бренд</S.titleCol04>
                    </S.contentTitle>
                    <S.contentGoodsList>
                      {goods.map((item) => (
                        <ListItem key={item.id} good={item} />
                      ))}
                    </S.contentGoodsList>
                  </>
                ) : (
                  <S.filterNotFound>
                    Товаров, соответствующих вашему запросу, не найдено
                    <img
                      src="img/smile_crying.png"
                      alt="crying"
                      style={{ width: 52, height: 52 }}
                    />
                  </S.filterNotFound>
                )}
              </S.centalBlockContent>
            </div>
            <S.paginationBlock>
              <S.goodsPerPage>
                <span style={{ color: "white" }}> Выводить по </span>
                <FilterCategory
                  title={perPage}
                  content={[10, 30, 50, 100]}
                  pop="up"
                  activeFilter={perPage}
                  setFilter={setPerPage}
                />
                <span style={{ color: "white" }}> товаров </span>
              </S.goodsPerPage>
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </S.paginationBlock>
          </S.mainCentalBlock>
        </S.main>
      </S.container>
    </S.wrapper>
  );
};
