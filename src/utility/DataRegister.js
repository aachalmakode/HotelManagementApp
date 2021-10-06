class DataRegister {
    
    customerName;
    customerGender;
    customerID;
    customerMobNo;
    checkInDate;
    checkInTime;
    checkOutDate;
    checkOutTime;

    
    constructor(customerName, customerGender, customerID, customerMobNo, checkInDate, checkInTime, checkOutDate, checkOutTime) {
        this.customerName = customerName;
        this.customerGender = customerGender;
        this.customerID = customerID;
        this.customerMobNo = customerMobNo;
        this.checkInDate = checkInDate;
        this.checkInTime = checkInTime;
        this.checkOutDate = checkOutDate;
        this.checkOutTime = checkOutTime;
    }

    get getCustomerName() {
        return this.customerName;
    }

    set setCustomerName(value) {
        this.customerName = value;
    }

    get getCustomerGender() {
        return this.customerGender;
    }

    set setCustomerGender(value) {
        this.customerGender = value;
    }

    get getCustomerID() {
        return this.customerID;
    }

    set setCustomerID(value) {
        this.customerID = value;
    }

    get getCustomerMobNo() {
        return this.customerMobNo;
    }

    set setCustomerMobNo(value) {
        this.customerMobNo = value;
    }

    get getCheckInDate() {
        return this.checkInDate;
    }

    set setCheckInDate(value) {
        this.checkInDate = value;
    }

    get getCheckInTime() {
        return this.checkInTime;
    }

    set setCheckInTime(value) {
        this.checkInTime = value;
    }

    get getCheckOutDate() {
        return this.checkOutDate;
    }

    set setCheckOutDate(value) {
        this.checkOutDate = value;
    }

    get getCheckOutTime() {
        return this.checkOutTime;
    }

    set setCheckOutTime(value) {
        this.checkOutTime = value;
    }
}

exports.DataRegister = DataRegister;