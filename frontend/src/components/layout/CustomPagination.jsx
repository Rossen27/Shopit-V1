import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState();

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium mt-10">
      {/* Render Prev Page Button only if not on the first page */}
      {currentPage !== 1 && (
        <li>
          <a
            href="#"
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            onClick={() => setCurrentPageNo(currentPage - 1)}
          >
            <span className="sr-only">Prev Page</span>
            <i className="fa-solid fa-angle-left"></i>
          </a>
        </li>
      )}

      {/* Render Page Numbers Dynamically */}
      {Array.from({ length: Math.ceil(filteredProductsCount / resPerPage) }).map((_, index) => (
        <li key={index}>
          <a
            href="#"
            className={`block size-8 rounded border ${currentPage === index + 1 ? "border-gray-600 bg-gray-600 text-white" : "border-gray-100 bg-white"} text-center leading-8 text-gray-900`}
            onClick={() => setCurrentPageNo(index + 1)}
          >
            {index + 1}
          </a>
        </li>
      ))}

      {/* Render Next Page Button only if not on the last page */}
      {currentPage !== Math.ceil(filteredProductsCount / resPerPage) && (
        <li>
          <a
            href="#"
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            onClick={() => setCurrentPageNo(currentPage + 1)}
          >
            <span className="sr-only">Next Page</span>
            <i className="fa-solid fa-angle-right"></i>
          </a>
        </li>
      )}
    </ol>
  );
};

export default CustomPagination;
