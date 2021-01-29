import React from "react";

import "./Table.css";
import HeadTable from "./HeadTable/HeadTable";
import BodyTable from "./BodyTable/BodyTable";

const Table = ({ data, headings, onChange, sort, query }) => {
  return (
    <div className="table">
      <table>
        <HeadTable
          headings={headings}
          onChange={onChange}
          sort={sort}
          data={data}
          query={query}
        />
        <BodyTable data={data} />
      </table>
    </div>
  );
};

export default Table;
