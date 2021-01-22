class User{
    constructor(user, country, state){
        this.id = user.id;
        this.fullName = user.fullName;
        this.isActive = user.isActive.toString();
        this.registered = user.registered;
        this.balance = user.balance;
        this.country = country.country;
        this.state = state.name;
    }
};

export { User };



// <input
//     type='checkbox'
//     checked={searchHeading.includes(heading)}
//     onChange={() => {
//         const checked = searchHeading.includes(heading)
//         setCheckbox((prev) => checked ? prev.filter(h => h !== heading) : [...prev, heading])
//     }}
// />

// const filterActive = (type) => {
  //   if(searched){
  //     if(filteredActive){
  //       return
  //     }
  //     const filtered = type === 'active' 
  //     ? filteredData.filter(user => user.isActive === true)
  //     : filteredData.filter(user => user.isActive === false);
  //   setFilteredData(filtered)
  //   } else{
  //     const filtered = type === 'active' 
  //     ? data.filter(user => user.isActive === true)
  //     : data.filter(user => user.isActive === false);
  //   setFilteredData(filtered)
  //   }
  // }