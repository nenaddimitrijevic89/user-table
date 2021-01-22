import React from 'react';

import './Table.css';
import HeadTable from './HeadTable/HeadTable';
import BodyTable from './BodyTable/BodyTable';

const Table = ({ data, sort, setFilteredData, search, setQuery }) => {
    return(
        <div className="container-table">
            <div className="wrap-table">
                <div className="table">
                    <table>
                        <HeadTable
                            data={data}
                            sort={sort}
                            search={search}
                            setFilteredData={setFilteredData}
                            setQuery={setQuery}
                            />
                        <BodyTable data={data} />
                    </table>
                </div>
            </div>
        </div>
    )
};
   

        
        


export default Table;