import React from "react";
import Paginate from "react-paginate";
import EmptyBox from "../empty-box";
import { TableOptions } from "./interface";
import "./styles.scss";

const Table: React.FC<TableOptions> = ({
  columns,
  rows,
  page,
  lastPage,
  onPageChange,
  title,
}) => {
  return (
    <>
      {rows.length === 0 ? (
        <EmptyBox />
      ) : (
        <>
          <div className="relative flex flex-col min-w-0 break-words">
            {title && (
              <div className="rounded-t ">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    {columns.map((column: JSX.Element, index: number) => (
                      <React.Fragment key={index}>{column}</React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row: JSX.Element, index: number) => (
                    <React.Fragment key={index}>{row}</React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {!!page && !!lastPage && lastPage !== 1 && (
            <Paginate
              previousClassName="hidden"
              nextClassName="hidden"
              forcePage={page - 1}
              pageCount={lastPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={onPageChange}
              containerClassName="pagination"
              activeClassName="active bg-pink-500 text-white"
              breakLinkClassName="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-yellow-500 bg-white text-yellow-500"
              pageLinkClassName="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-yellow-500 bg-white text-yellow-500"
            />
          )}
        </>
      )}
    </>
  );
};

export default Table;
