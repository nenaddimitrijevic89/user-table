class User{
    constructor(user, state, country){
        this.id = user.id;
        this.fullName = user.fullName;
        this.isActive = user.isActive.toString();
        this.registered = user.registered;
        this.balance = user.balance;
        this.state = state.name;
        this.country = country.country;
    }
};

export { User };