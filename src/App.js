import './App.css';
import React, { useState, useEffect } from 'react';
import Table from './view/Table';
import { User } from './entities/user';
import { convertTime, hide } from './shared/utilities';

function App() {
  const [ data, setData ] = useState([]);
  const [ filteredData, setFilteredData ] = useState([]);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    fetch('https://fww-demo.herokuapp.com/')
        .then(response => response.json())
        .then(data => {
            const users = data.map(country => country.state.map(st => st.users.map(user => new User(user, country, st))))
            const merged = [].concat.apply([], users)
            const mer = [].concat.apply([], merged)
            setData(mer);
            setFilteredData(mer);
        })
  }, []);

  const search = (value, heading) => {
    if(query){
      return filteredData.filter(user => user[heading].toLowerCase().includes(value.toLowerCase()))
    }
    return data.filter(user => user[heading].toLowerCase().includes(value.toLowerCase()))
  }

  const sort = (data, type, order) => {
    let sorted = null;
    if(type === 'balance'){
      if(order === 'asc' ){
        sorted = data.sort((a, b) => hide(a.balance) - hide(b.balance))
      }else{
        sorted = data.sort((a, b) => hide(b.balance) - hide(a.balance))
      }
      setFilteredData(sorted)
    }else{
      if(order === 'asc'){
        sorted = data.sort((a, b) => convertTime(a.registered) - convertTime(b.registered))
      }else{
        sorted = data.sort((a, b) => convertTime(b.registered) - convertTime(a.registered))
      }
      setFilteredData(sorted)
    }
  };

  return (
    <div className='limiter'>
      <Table data={filteredData.slice(0, 3000)}
        sort={sort}
        setFilteredData={setFilteredData}
        search={search}
        setQuery={setQuery}
        />
    </div>
  );
};

export default App;
