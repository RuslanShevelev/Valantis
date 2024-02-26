import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as S from './goodItem.styles'

export const ListItem = ({ good }) => (
  <S.goodsListItem>
    <SkeletonTheme baseColor="#696969" highlightColor="#b672ff" height={19}>
      <S.goodsListGood>
        <S.goodTitle>
            <S.goodTitleId>
              {good ? good.id : <Skeleton width={356} />}
            </S.goodTitleId>
        </S.goodTitle>
        <S.goodName>{good ? good.product : <Skeleton width={356} />}
          {/* <S.userAuthorLink href={`${user?.html_url}`}>
            {user ? user?.html_url : <Skeleton width={356} />}
          </S.userAuthorLink> */}
        </S.goodName>
        <S.goodPrice>{good ? good.price : <Skeleton width={356} />}
          {/* <S.userAuthorLink href={`${user?.html_url}`}>
            {user ? user?.html_url : <Skeleton width={356} />}
          </S.userAuthorLink> */}
        </S.goodPrice>
        <S.goodBrand>{good ? good.brand : <Skeleton width={356} />}
          {/* {user ? (
            <S.userInfoBtn onClick={() => setModal(user?.login)}>
              get more info
            </S.userInfoBtn>
          ) : (
            <Skeleton width={50} />
          )} */}
        </S.goodBrand>
      </S.goodsListGood>
    </SkeletonTheme>
  </S.goodsListItem>
)