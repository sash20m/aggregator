import React, { useState, useCallback, useEffect } from 'react';

import './Pagination.scss';

interface Props {
  pages: number;
  changePage(newPage: string): void;
}

export const Pagination: React.FC<Props> = ({ pages, changePage }) => {
  const [pagesArray, setPagesArray] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [clickedPage, setClickedPage] = useState<number>(1);

  useEffect(() => {
    if (pages < pagesArray.length) setPagesArray(pagesArray.splice(0, pages));
  }, [pages, pagesArray]);

  const goOnePageBack = () => {
    if (firstPage === 1 || pages < 7) return;
    setFirstPage((prevState: number) => prevState - 1);
  };

  const goOnePageFuther = () => {
    if (firstPage + 6 === pages || pages < 7) return;
    setFirstPage((prevState: number) => prevState + 1);
  };

  const goToPage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setClickedPage(parseInt(e.currentTarget.name, 10));
      changePage(e.currentTarget.name);
    },
    [changePage]
  );

  return (
    <div className="pagination">
      <button
        className="pagination__arrow-btn"
        type="button"
        onClick={goOnePageBack}
        data-testid="goOnePageBack"
      >
        {'<'}
      </button>
      {pagesArray.map((page, key) => (
        <button
          data-testid={key}
          key={page}
          className={
            firstPage + key === clickedPage
              ? 'pagination__page-btn--active'
              : 'pagination__page-btn'
          }
          type="button"
          name={(firstPage + key).toString(10)}
          onClick={goToPage}
        >
          {firstPage + key}
        </button>
      ))}
      <button
        className="pagination__arrow-btn"
        type="button"
        onClick={goOnePageFuther}
        data-testid="goOnePageFurther"
      >
        {'>'}
      </button>
    </div>
  );
};
