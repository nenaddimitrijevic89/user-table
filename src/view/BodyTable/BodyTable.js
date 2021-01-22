import React from 'react';

import './BodyTable.css';
import { convertDate } from '../../shared/utilities';

const BodyTable = ({ data }) => {
    let users = null;
    if(data){
        users = data.map(user => (
            <tr key={user.id} onClick={()=> console.log(typeof user.isActive)}>
                <td className='column1'>{user.fullName}</td>
                <td className='column2'>{user.isActive}</td>
                <td className='column3'>{convertDate(user.registered)}</td>
                <td className='column4'>{user.balance}</td>
                <td className='column5'>{user.country}</td>
                <td className='column6'>{user.state}</td>
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