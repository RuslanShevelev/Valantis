import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./goodItem.styles";

export const ListItem = ({ good }) => (
  <S.goodsListItem>
    <S.goodsListGood>
      <S.goodTitle>
        <S.goodTitleId>{good.id}</S.goodTitleId>
      </S.goodTitle>
      <S.goodName>{good.product}</S.goodName>
      <S.goodPrice>
        {new Intl.NumberFormat("ru", {
          style: "currency",
          minimumFractionDigits: 0,
          currency: "RUB",
        }).format(good.price)}
      </S.goodPrice>
      <S.goodBrand>{good.brand}</S.goodBrand>
    </S.goodsListGood>
  </S.goodsListItem>
);
