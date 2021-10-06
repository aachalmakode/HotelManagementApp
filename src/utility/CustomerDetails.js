class CustomerDetails {
    firstName;
    lastName;
    gender;
    mobNo;
    userId;
    
    constructor(firstName, lastName, gender, mobNo, userID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.mobNo = mobNo;
        this.userID = userID;
    }

    get getFirstName() {
        return this.firstName;
    }

    set setFirstName(value) {
        this.firstName = value;
    }

    get getLastName() {
        return this.lastName;
    }

    set setLastName(value) {
        this.lastName = value;
    }

    get getUserGender() {
        return this.gender;
    }

    set setUserGender(value) {
        this.gender = value;
    }

    get getUserMobNo() {
        return this.mobNo;
    }

    set setUserMobNo(value) {
        this.mobNo = value;
    }

    get getUserID() {
        return this.userID;
    }

    set setUserID(value) {
        this.userID = value;
    }
}


exports.CustomerDetails = CustomerDetails;

