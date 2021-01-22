import "./App.css";
import React, { useState, useEffect } from "react";
import Table from "./view/Table";
import { User } from "./entities/user";
import { convertTime, hide } from "./shared/utilities";
import Loader from './view/Loader/Loader';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fww-demo.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => {
        const users = data.map((country) =>
          country.state.map((st) =>
            st.users.map((user) => new User(user, country, st))
          )
        );
        const merged = [].concat.apply([], users);
        const mer = [].concat.apply([], merged);
        setData(mer);
        setFilteredData(mer);
        setLoading(false);
      });
  }, []);

  const headings = data[0] && Object.keys(data[0]).filter((el) => el !== "id");

  const search = (value, heading) => {
    if (query) {
      return filteredData.filter((user) =>
        user[heading].toLowerCase().includes(value.toLowerCase())
      );
    }
    return data.filter((user) =>
      user[heading].toLowerCase().includes(value.toLowerCase())
    );
  };

  const sort = (data, type, order) => {
    let sorted = null;
    if (type === "balance") {
      if (order === "asc") {
        sorted = data.sort((a, b) => hide(a.balance) - hide(b.balance));
      } else {
        sorted = data.sort((a, b) => hide(b.balance) - hide(a.balance));
      }
      setFilteredData(sorted);
    } else {
      if (order === "asc") {
        sorted = data.sort(
          (a, b) => convertTime(a.registered) - convertTime(b.registered)
        );
      } else {
        sorted = data.sort(
          (a, b) => convertTime(b.registered) - convertTime(a.registered)
        );
      }
      setFilteredData(sorted);
    }
  };

  let table = loading
              ? <Loader />
              : <Table
                  data={filteredData.slice(0, 4000)}
                  sort={sort}
                  setFilteredData={setFilteredData}
                  search={search}
                  setQuery={setQuery}
                  headings={headings}
            />;

  return (
    <div className="limiter">
      {table}
    </div>
  );
}

export default App;
