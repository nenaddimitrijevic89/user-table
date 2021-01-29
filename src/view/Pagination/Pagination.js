import React from 'react';
import './Pagination.css';

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage, setCurrentPage, setUsersPerPage }) => {

  const pages = Math.ceil(totalUsers / usersPerPage);
  let buttons = currentPage === 1 ? currentPage - 1 : currentPage - 2;
  let previous = currentPage === 1 ? 1 : currentPage - 1;
  let next = currentPage === pages ? pages : currentPage + 1;
  
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
      <div className='pagination'>
        <div className='btn'>

          <button className='button' onClick={() => {
            setUsersPerPage(20)
            if(totalUsers<=20)return setCurrentPage(1)
            if(usersPerPage === 20)return
            if(usersPerPage===50 && currentPage===Math.ceil(totalUsers/50))return setCurrentPage(Math.ceil(totalUsers/20))
            if(usersPerPage === 100 && currentPage===Math.ceil(totalUsers/100))return setCurrentPage(Math.ceil(totalUsers/20))
            setCurrentPage(Math.ceil(usersPerPage*currentPage/20))
            }}>20</button>

          <button className='button' onClick={() => {
            setUsersPerPage(50)
            if(totalUsers<=50)return setCurrentPage(1)
            if(usersPerPage === 50)return
            if(usersPerPage===100 && currentPage===Math.ceil(totalUsers/100))return setCurrentPage(Math.ceil(totalUsers/50))
            setCurrentPage(Math.ceil(usersPerPage*currentPage/50))
            }}>50</button>

          <button className='button' onClick={() => {
            setUsersPerPage(100)
            if(usersPerPage === 100)return
            setCurrentPage(Math.ceil(usersPerPage*currentPage/100))
            }}>100</button>
        </div>

        <button className='button' onClick={() => setCurrentPage(previous)}><i className="fa fa-arrow-left"></i></button>
        
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className='button'>
            {number}
          </button>
        )).slice(buttons, currentPage+5)}
        
        <button className='button' onClick={() => setCurrentPage(next)}><i className="fa fa-arrow-right"></i></button>
      </div>
  );
};

export default Pagination;