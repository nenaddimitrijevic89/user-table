import React from "react";

import "./Table.css";
import HeadTable from "./HeadTable/HeadTable";
import BodyTable from "./BodyTable/BodyTable";

const Table = ({ data, sort, setFilteredData, search, setQuery, headings }) => {
  return (
    <div className="table">
      <table>
        <HeadTable
          sort={sort}
          search={search}
          setFilteredData={setFilteredData}
          setQuery={setQuery}
          headings={headings}
        />
        <BodyTable data={data} />
      </table>
    </div>
  );
};

export default Table;
