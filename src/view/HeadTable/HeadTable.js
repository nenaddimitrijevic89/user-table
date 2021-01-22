import React from 'react';

import './HeadTable.css';

const HeadTable = ({ data, sort, setFilteredData, search, setQuery }) => {

    const headings = data[0] && Object.keys(data[0]).filter(el => el !== 'id');
    
    return (
        <thead>
            <tr className="table-head">
                {data[0] && headings.map((heading, i) => {
                    if(heading){                    
                        return <th key={heading + i} className={`column${i+1}`}>{heading} 
                                    <input type='text' onChange={e =>{
                                        setQuery(e.target.value)
                                        const filtered = search(e.target.value, heading)
                                        setFilteredData(filtered)
                                    }}/>
                                </th>
                    // }else if(heading === 'isActive'){
                    //     return <th key={heading + i} className={`column${i+1}`}>
                    //                 <i className='fa fa-check'></i> {heading} <i className="fa fa-close"></i>
                    //             </th>
                    // }else{                        
                    //     return <th key={heading + i} className={`column${i+1}`}>
                    //                 <i className='fa fa-arrow-up' onClick={()=> sort(data, heading)}></i> {heading} <i className="fa fa-arrow-down" onClick={()=> sort(data, heading, 'asc')}></i>
                    //             </th>
                    }
                })}
            </tr>
        </thead>      
    )
};

export default HeadTable;