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
        <svg onClick={() => setCurrentPage(currentPage - 1)} width="36" height="34" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7L12.75 0.937823L12.75 13.0622L3 7Z" fill="#D9D9D9"/>
        </svg> 
      )}
      <S.pageList>
        {pages.map((item) => (
          <S.pageItem
            key={item === '...' ? Math.random() : item}
            $active={currentPage === item}
            onClick={() => {
              setCurrentPage(item)
            }}
            disabled={item === '...'}
          >
            {item}
          </S.pageItem>
        ))}
      </S.pageList>
      {currentPage !== pagesCount && (
          <svg onClick={() => setCurrentPage(currentPage + 1)} width="36" height="34" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 7L3.25 0.937823L3.25 13.0622L13 7Z" fill="#D9D9D9"/>
          </svg> 
       )} 
    </S.pagination>
  )
}
