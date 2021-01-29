import React, { useState, useEffect } from "react";

import "./App.css";
import Table from "./view/Table";
import { User } from "./entities/user";
import { convertTime, hide } from "./shared/utilities";
import Loader from "./view/Loader/Loader";
import Pagination from "./view/Pagination/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState({
    fullName: "",
    registered: "",
    balance: "",
    state: "",
    country: "",
    checkedTrue: true,
    checkedFalse: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(20);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fww-demo.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => {
        const users = data.map((country) =>
          country.state.map((state) =>
            state.users.map((user) => new User(user, state, country))
          )
        );
        const temp = [].concat.apply([], users);
        const merged = [].concat.apply([], temp);
        setData(merged);
        setFilteredData(merged);
      })
      .catch(() => setError(true));
  }, []);

  const headings = data[0] && Object.keys(data[0]).filter((el) => el !== "id");

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const search = (value, heading) => {
    setCurrentPage(1);
    return data.filter((user) => {
      const fullNameValue = heading === "fullName" ? value : query.fullName;
      const isCheckedTrueValue = heading === "checkedTrue" ? value : query.checkedTrue;
      const isCheckedFalseValue = heading === "checkedFalse" ? value : query.checkedFalse;
      const registeredValue = heading === "registered" ? value : query.registered;
      let balanceValue = heading === "balance" ? value : query.balance;
      const stateValue = heading === "state" ? value : query.state;
      const countryValue = heading === "country" ? value : query.country;

      const fullName = user.fullName
        .toLowerCase()
        .includes(fullNameValue.toLowerCase());

      let isActiveMatch = "all";
      if (isCheckedTrueValue && !isCheckedFalseValue) {
        isActiveMatch = true;
      }
      if (!isCheckedTrueValue && isCheckedFalseValue) {
        isActiveMatch = false;
      }

      const isActive =
        isActiveMatch !== "all" ? user.isActive.includes(isActiveMatch) : true;

      const registered = user.registered.includes(registeredValue);

      if (balanceValue.length >= 4) {
        if (balanceValue[1] === ",") {
          balanceValue = balanceValue.slice(0, 1) + balanceValue.slice(2);
        }
        balanceValue = balanceValue.slice(0, 1) + "," + balanceValue.slice(1);
      }
      const balance = user.balance.includes(balanceValue);

      const state = user.state
        .toLowerCase()
        .includes(stateValue.toLowerCase());

      const country = user.country
        .toLowerCase()
        .includes(countryValue.toLowerCase());

      return fullName && registered && balance && state && country && isActive;
    });
  };

  const onChange = (value, heading) => {
    setQuery({ ...query, [heading]: value });
    const filtered = search(value, heading);
    setFilteredData(filtered);
  };

  const sort = (type, order) => {
    setCurrentPage(1);
    const tempData = [...data];

    let sorted = null;
    if (type === "balance") {
      if (order === "asc") {
        sorted = filteredData.sort((a, b) => hide(a.balance) - hide(b.balance));
      } else {
        sorted = filteredData.sort((a, b) => hide(b.balance) - hide(a.balance));
      }
    } else {
      if (order === "asc") {
        sorted = filteredData.sort(
          (a, b) => convertTime(a.registered) - convertTime(b.registered)
        );
      } else {
        sorted = filteredData.sort(
          (a, b) => convertTime(b.registered) - convertTime(a.registered)
        );
      }
    }
    setFilteredData(sorted);
    setData(tempData);
  };

  let table = error ? (
    <h1 className="error">Something went wrong &#x1F610;</h1>
  ) : (
    <Loader />
  );

  if (data.length) {
    table = (
      <>
        <Table
          data={currentUsers}
          headings={headings}
          onChange={onChange}
          sort={sort}
          query={query}
        />
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={filteredData.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setUsersPerPage={setUsersPerPage}
        />
      </>
    );
  }

  return <div className="limiter">{table}</div>;
}

export default App;