import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
const PaginationOfProductList = ({ setCurrentPage, totalPagesNum }) => {
  let numberOfPages = [];
  for (let i = 1; i <= totalPagesNum; i++) {
    numberOfPages.push(i);
  }

  //btn degisende pagede asagida degisecek
  const [currentBtn, setCurrentBtn] = useState(1);
  // console.log(numberOfPages);
  // console.log(totalPagesNum);

  useEffect(() => {
    setCurrentPage(currentBtn);
  }, [currentBtn, setCurrentPage]);
  return (
    <div className="pagination_container">
      <ul className="pagination">
        {numberOfPages.map((page, index) => {
          return (
            <li
              className={`${
                currentBtn === page ? "page_item selected" : "page_item"
              }`}
              key={index}
            >
              <a
                onClick={() => setCurrentBtn(page)}
                className="page_link"
                href="#!"
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={`${
            currentBtn === numberOfPages.length
              ? "page_item disabled"
              : "page_item"
          } `}
        >
          <a
            className="page_link"
            href="#!"
            onClick={() =>
              setCurrentBtn((prev) =>
                prev === numberOfPages.length ? prev : prev + 1
              )
            }
          >
            &gt;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PaginationOfProductList;
/*
<ul class="pagination"><li class="previous disabled"><a class=" " tabindex="-1" role="button" aria-disabled="true" aria-label="Previous page" rel="prev">Previous</a></li><li class="page_item selected"><a rel="canonical" role="button" class="page_link" tabindex="-1" aria-label="Page 1 is your current page" aria-current="page">1</a></li><li class="page_item"><a rel="next" role="button" class="page_link" tabindex="0" aria-label="Page 2">2</a></li><li class="page_item"><a role="button" class="page_link" tabindex="0" aria-label="Page 3">3</a></li><li class="page_item"><a class="page_link" tabindex="0" role="button" aria-disabled="false" aria-label="Next page" rel="next">&gt;</a></li></ul>
*/

{
  /* <ReactPaginate
  nextLabel=">"
  breakLabel="..."
  pageCount={3}
  marginPagesDisplayed={2}
  pageRangeDisplayed={2}
  onPageChange={handlePageClick}
  containerClassName={"pagination"} //di
  pageClassName={"page_item"} //li
  pageLinkClassName={"page_link"}
  nextClassName={"page_item"}
  nextLinkClassName={"page_link"}
  breakClassName={"page_item"}
  breakLinkClassName={"page_link"}
/> */
}
/*
      <li className="page_item selected">
          <a
            rel="canonical"
            role="button"
            className="page_link"
            tabindex="-1"
            aria-label="Page 1 is your current page"
            aria-current="page"
          >
            1
          </a>
        </li>
        <li className="page_item">
          <a
            rel="next"
            role="button"
            className="page_link"
            tabindex="0"
            aria-label="Page 2"
          >
            2
          </a>
        </li>
        <li className="page_item">
          <a
            role="button"
            className="page_link"
            tabindex="0"
            aria-label="Page 3"
          >
            3
          </a>
        </li>
        <li className="page_item">
          <a
            className="page_link"
            tabindex="0"
            role="button"
            aria-disabled="false"
            aria-label="Next page"
            rel="next"
          >
            &gt;
          </a>
        </li>
*/
