import { useEffect, useState } from 'react';

function PeoplePaginate({ people, setCurrentPage, currentPage }) {
  const [pagesNumber, setPagesNumber] = useState(1);

  useEffect(() => {
    setPagesNumber(Math.ceil(people.length / 6));
  }, [people]);

  const changePage = (event) => {
    setCurrentPage(parseInt(event.target.value));
  };

  return (
    <div id='pages'>
      {Array.from({ length: pagesNumber }, (_, i) => i + 1).map((number) => {
        return (
          <button
            key={number}
            id={number === currentPage ? 'active' : 'inactive'}
            value={number}
            onClick={changePage}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}

export default PeoplePaginate;
