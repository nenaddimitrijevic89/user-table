import React from 'react';

import './HeadTable.css';

const HeadTable = ({ headings, onChange, sort, query }) => {
    
    return (
        <thead>
            <tr className="table-head">
                {headings && headings.map((heading, i) => {
                                    
                        return <th key={heading} className={`column${i+1}`}>
            
                                    {(heading === 'registered' || heading === 'balance') 
                                    && <i className='fa fa-arrow-up right' onClick={()=> sort(heading)}></i>}

                                    {heading}

                                    {(heading === 'registered' || heading === 'balance') 
                                    && <i className='fa fa-arrow-down left' onClick={()=> sort(heading, 'asc')}></i>} 

                                    { heading !== 'isActive' && <input type='text' onChange={ (e) => onChange(e.target.value, heading)}/>}

                                    {heading === 'isActive' &&
                                    <>
                                        <div className='check'>
                                            <input type="checkbox" checked={query.checkedTrue} name="checkedTrue" onChange={ (e) => onChange(e.target.checked, 'checkedTrue')}/> true
                                        </div>
                                        <div className='check'>
                                            <input type="checkbox" checked={query.checkedFalse} name="checkedFalse" onChange={ (e) => onChange(e.target.checked, 'checkedFalse')}/> false
                                        </div>
                                    </>
                                    }
                                </th>
                })}
            </tr>
        </thead>      
    )
};

export default HeadTable;