import * as S from './pagelist.styles'
import { createPages } from '../../utils/helpers'

export const Pagination = ({ 
  pagesCount, 
  currentPage, setCurrentPage }) => {
  const pages = []
  createPages(pages, pagesCount, currentPage)

  return (
    <S.pagination>
      {currentPage > 1 && (
        <S.svgDiv>

        <S.svgBtn onClick={() => setCurrentPage(currentPage - 1)} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7L12.75 0.937823L12.75 13.0622L3 7Z" />
        </S.svgBtn> 
        </S.svgDiv>

      )}
      <S.pageList>
        {pages.map((item) => (
          <li key={item === '...' ? Math.random() : item}>
          <S.pageItem
            
            $active={currentPage === item}
            onClick={() => {
              setCurrentPage(item)
            }}
            disabled={item === '...'}
          >
            {item}
          </S.pageItem>
          </li>
        ))}
      </S.pageList>
      {currentPage !== pagesCount && (
<S.svgDiv>
          <S.svgBtn onClick={() => setCurrentPage(currentPage + 1)} viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 7L3.25 0.937823L3.25 13.0622L13 7Z" />
          </S.svgBtn> 
</S.svgDiv>
       )} 
    </S.pagination>
  )
}
