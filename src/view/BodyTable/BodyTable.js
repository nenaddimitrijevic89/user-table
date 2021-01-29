import React from 'react';

import './BodyTable.css';
import { convertDate } from '../../shared/utilities';

const BodyTable = ({ data }) => {
    
    let users = <tr className='no_data'><td>Sorry, that data does not exist &#x1F610;</td></tr>;

    if(data.length){
        users = data.map(user => (
            <tr key={user.id}>
                <td className='column1'>{user.fullName}</td>
                <td className='column2'>{user.isActive}</td>
                <td className='column3'>{convertDate(user.registered)}</td>
                <td className='column4'>{user.balance}</td>
                <td className='column5'>{user.state}</td>
                <td className='column6'>{user.country}</td>
            </tr>
        ))
    }
    return (
            <tbody>            
                {users}
            </tbody>
    )
};

export default BodyTable;