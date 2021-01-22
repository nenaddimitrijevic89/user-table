const convertDate = (date) => {

    const dateOfBirth = new Date(date);
    const y = dateOfBirth.getFullYear();
    let m = dateOfBirth.getMonth() + 1;
    let d = dateOfBirth.getDate();
    d = d<10 ? `0${d}` : d;
    m = m<10 ? `0${m}` : m;
    return (
        `${y}-${m}-${d}`
    )
};

const convertTime = (date) => {
    const time = new Date(date);
    return (time.getTime())
};

const hide = (input) => {
    let str = input.slice(1);
    let number = "";
   
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ",") {
            number += str[i];
        }
    }
    return +number;
};

export { convertDate, hide, convertTime };