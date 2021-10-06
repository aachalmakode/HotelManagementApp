const fileSystem = require('fs');
const pmpt = require("prompt-sync")();
const writeInXlsx = require('xlsx');
const util = require('./UtilityClass');
const order = require('./OrderDetails');
const data = require('./DataRegister');


const utilInput = new util.UtilInput();
const orderArray = [];

class LoadData {

    getJsonDataObj(filePath) {
        const userRegister = fileSystem.readFileSync(filePath);
        const userRegisterObj = JSON.parse(userRegister);
        return userRegisterObj;
    }
        
    writeDataInFile(filePath, data) {
        const jsonStringOfData = fileSystem.readFileSync(filePath);
        let tempData;
        if (jsonStringOfData.length === 0) {
            tempData = data;
        }
        else {
            const objOfData = JSON.parse(jsonStringOfData);
            objOfData.push(data);
            tempData = objOfData;
        }

        const dataJsonString = JSON.stringify(tempData, null, 2);
        fileSystem.writeFileSync(filePath, dataJsonString);
    }

   loginCustomer() {
        const userKey = utilInput.showLoginOptions();
        if (userKey === "Admin9999") {
            const adminChoice = utilInput.showAdminLoginMenu();
            switch (adminChoice) {
                case 1:
                     this.printReportInXlsx();
                    break;
                case 2:
                    console.log('Sucessfully Logged Out.....!');
                    break;
                default:
                    break;
            }
        }
        else {
            const isUserPresent = this.checkUserPresent(userKey);
            if (isUserPresent) {
        
                this.registerUserOperations(userKey);
            }
        }
    }

  printReportInXlsx() {
    const reportData = this.getObjOfJsonFileData('./reports/repo.json');
    //creating a workbook
    let workBook = writeInXlsx.utils.book_new();
    //creting worksheet
    let workSheet = writeInXlsx.utils.json_to_sheet(reportData);
    writeInXlsx.utils.book_append_sheet(workBook, workSheet, 'UserOrderHistory');
    writeInXlsx.writeFile(workBook, './reports/CSV.xlsx');
    console.log(`\nReport Created Sucessfully...!!!`);
}


    checkUserPresent(userId) {
        let flag = true;
        const userRegisterObj = this.getJsonDataObj('./json/entry.json');
        for (let user in userRegisterObj) {
            if (userRegisterObj[user].userID === userId) {
                console.log(`\nLogin Sucessfully...!!!`);
                flag = true;
            }
        }

        if (!flag) {
            console.log(`\nInvalid Key...!!!`);
            this.loginUserToSystem();
        }
        return flag;
    }

    UserKeyGeneration(userId) {
        const userRegisterObj = this.getJsonDataObj('./json/entry.json');
        for (let user in userRegisterObj) {
            if (userRegisterObj[user].userID === userId) {
                const customerDetailsObj = userRegisterObj[user];
                return customerDetailsObj;
            }
        }
        return null;
    }

    registerUserOperations(userID) {
    const registercustomerDetails = this.UserKeyGeneration(userID);
    const nameOfUser = registercustomerDetails.firstName +" "+ registercustomerDetails.lastName;
    const dataArray = [];
    this.checkinDetailsAdding(registercustomerDetails, nameOfUser, dataArray);


        let flag = true;
        while (flag) {
          //  console.log(`\n Hotel Management System `);
            console.log(`\n<<<< WELCOME TO PALACE HOTEL ${userKey} >>>>`);
            utilInput.userOperationMenu();
            const selectedOption = + pmpt(`Click (1 Or 2) : `);
            let selectFood;
            if (selectedOption === 1) {
                selectFood = utilInput.showFoodOrderMenu();
                this.placeFoodOrder(selectFood);
    
            }
            else if (selectedOption === 2) {
                this.checkoutDetailsAdding(dataArray);
                this.daysOfStayBill(dataArray);
                this.addingDataToHotelBook(dataArray);
                const totalBill = this.generateFinalBill(dataArray, orderArray);
                const orderHistory = this.getOrderArrayInString(orderArray);
                this.generateReport(dataArray, orderHistory, totalBill);
            
            flag = false;
            }
        }
    }
    checkinDetailsAdding(registercustomerDetails, nameOfUser ,  detailsRegister) {
        const dataRegister = new data.DataRegister();
        const date = new Date();

        dataRegister.setCustomerName = nameOfUser;
        dataRegister.setCustomerGender = registercustomerDetails.gender;
        dataRegister.setCustomerID = registercustomerDetails.userID;
        dataRegister.setCustomerMobNo = registercustomerDetails.mobNo;
        const checkInDate = this.getFormatedDate(date);
        dataRegister.setCheckInDate = checkInDate;
        const checkInTime = this.getFormatedTimeInHourMin(date);
        dataRegister.setCheckInTime = checkInTime;
        const checkInTimeInMS = date.getTime();
        detailsRegister.push(dataRegister);
        detailsRegister.push(checkInTimeInMS);
    }

    checkoutDetailsAdding(detailsRegister) {
        const date = new Date();
        const checkOutDate = this.getFormatedDate(date);
        const checkOutTime = this.getFormatedTimeInHourMin(date);
        const checkOutTimeInMS = date.getTime();
        detailsRegister[0].setCheckOutDate = checkOutDate;
        detailsRegister[0].setCheckOutTime = checkOutTime;
        detailsRegister.push(checkOutTimeInMS);
    }

        getFormatedDate(regularDate) {
        let day = regularDate.getDate();
        let month = regularDate.getMonth() + 1;
        const year = regularDate.getFullYear();

        if(day < 10) {
            day = '0' + day;
        }
        if(month < 10) {
            month = '0' + month;
        }
        const formatedDate = month + '/' + day + '/' + year;
        return formatedDate;
    }
    getFormatedTimeInHourMin(regularDate) {
        const hour = regularDate.getHours();
        const minutes = regularDate.getMinutes();
        const hourMinutes = hour +" : "+ minutes;
        return hourMinutes;
    }
    daysOfStayBill(detailsRegister) {
        const checkOutTime = detailsRegister[2];
        const checkInTime = detailsRegister[1];
        const diffInTime = checkOutTime - checkInTime;
        const stayDurationInDay = ~~(diffInTime / (1000 * 3600 * 24));
        const stayDurationInHour = ~~(diffInTime / (1000 * 3600));
        const gst = 0.18;
        let chargeOfStay;
        if(stayDurationInDay > 0) {
            const perDayCharge = 1000;
            chargeOfStay = stayDurationInDay * perDayCharge;
            chargeOfStay = chargeOfStay + (chargeOfStay * gst);
            detailsRegister.push(stayDurationInDay);
            detailsRegister.push(0);
            detailsRegister.push(chargeOfStay)
        }

        if(stayDurationInHour <= 12) {
            const halfDayCharge = 500;
            chargeOfStay = halfDayCharge + (halfDayCharge * gst);
           detailsRegister.push(0);
           detailsRegister.push(stayDurationInHour);
           detailsRegister.push(chargeOfStay);
        }
        else if(stayDurationInHour > 12 && stayDurationInHour <= 24) {
            const chargeForDay = 1000;
            chargeOfStay = chargeForDay + (chargeForDay * gst);
           detailsRegister.push(0);
           detailsRegister.push(stayDurationInHour);
           detailsRegister.push(chargeOfStay);
        }

    }
    addingDataToHotelBook(detailsRegister) {
        const data = detailsRegister[0];
        const registerObj = {
            "Name Of Customer":data.getCustomerName,
            "Gender" : data.getCustomerGender,
            "UserID" : data.getCustomerID,
            "Mobile No" : data.getCustomerMobNo,
            "CheckIn Date" : data.getCheckInDate,
            "CheckIn Time" : data.getCheckInTime,
            "CheckOut Date" : data.getCheckOutDate,
            "CheckOut Time" : data.getCheckOutTime
        }
        this.writeDataInFile('./json/HotelBook.json', registerObj)
    }
    customerOrderDetails(name, quantity, price, amount) {
        const orderDetailsObj = new order.OrderDetails();
        orderDetailsObj.setItemName = name;
        orderDetailsObj.setItemQuantity = quantity;
        orderDetailsObj.setItemPrice = price;
        orderDetailsObj.setTotalAmount = amount;
        return orderDetailsObj;
    }

  placeFoodOrder(selectFood) {
    const itemQuantity =+ pmpt("Enter Quantity : ");
    let totalAmount;
    let gst = 0.18;
    switch (selectFood) {
        case 1:
            totalAmount = (itemQuantity * 25);
            totalAmount = totalAmount + (totalAmount * gst);
            const orderDetails1 = this.customerOrderDetails("Tea", itemQuantity, 25, totalAmount);
            this.generateBill(orderDetails1);
            this.addOrderToOrderArray(orderDetails1);
            break;
            case 2:
                totalAmount = (itemQuantity * 40);
                totalAmount = totalAmount + (totalAmount * gst);
                const orderDetails2 = this.customerOrderDetails(" Hot Coffee", itemQuantity, 40, totalAmount);
                this.generateBill(orderDetails2);
                this.addOrderToOrderArray(orderDetails2);
                break;
                case 3:
                    totalAmount = (itemQuantity *150 );
                    totalAmount = totalAmount + (totalAmount * gst);
                    const orderDetails3 = this.customerOrderDetails("Cold Coffee", itemQuantity, 150, totalAmount);
                    this.generateBill(orderDetails3);
                    this.addOrderToOrderArray(orderDetails3);
                    break;
        case 4:
            totalAmount = (itemQuantity * 80);
            totalAmount = totalAmount + (totalAmount * gst);
            this.generateBill(orderDetails4);
            this.addOrderToOrderArray(orderDetails4);
            break;
        case 5:
            totalAmount = (itemQuantity * 180);
            totalAmount = totalAmount + (totalAmount * gst);
            const orderDetails5 = this.customerOrderDetails("Lunch", itemQuantity, 250, totalAmount);
            this.generateBill(orderDetails5);
            this.addOrderToOrderArray(orderDetails5);
            break;
        case 6:
            totalAmount = (itemQuantity * 200);
            totalAmount = totalAmount + (totalAmount * gst);
            const orderDetails6 = this.customerOrderDetails("Dinner", itemQuantity, 300, totalAmount);
            this.generateBill(orderDetails6);
            this.addOrderToOrderArray(orderDetails6);
            break;
        default :
            break; 
    }

  }
    addOrderToOrderArray(orderObj) {
        let status = true;
        while(status) {
            console.log(`\nTo Confirm Order Enter Y / y & To Cancel Enter N / n`);
            let confirmOrder = pmpt(`Enter Here : `).toLowerCase();
            if(confirmOrder === 'y') {
                console.log(`YOUR ORDER IS PLACED..`);
                orderArray.push(orderObj);
                status = false;
            }
            
        }
    }

    getOrderArrayInString(orderArray) {
        let orderHistory = "";
        let count = 1;
        for(let element in orderArray) {
            const orderDetailsObj = orderArray[element];
            const nameOfItem = orderDetailsObj.itemName;
            const quantityOfItem = orderDetailsObj.itemQuantity;
            const priceOfItem = orderDetailsObj.itemPrice;
            const grandTotal = orderDetailsObj.totalAmount;
            orderHistory += count +". "+ "Name Of Item : " +nameOfItem+ ", " +"Quantity : " + quantityOfItem + ", "+
                            "Price : " +priceOfItem+ ", "+ "TotalAmount : " +grandTotal+ " | ";
            count++;                  
        }
        return orderHistory;
    }

    generateBill(userOrderObj) {
        console.log(`\nItem Name : ${userOrderObj.itemName}`);
        console.log(`Item Quantity : ${userOrderObj.itemQuantity}`);
        console.log(`Item Price : Rs.${userOrderObj.itemPrice}\n`);
        console.log(`Total Amount : Rs.${userOrderObj.totalAmount}`);
    }
    generateFinalBill(detailsRegister, ordersOfUser) {
        let totalBill = 0;
        const customerName = detailsRegister[0].getCustomerName;
        const stayDurationInDay = detailsRegister[3];
        const stayDurationInHour = detailsRegister[4];
        const charges = detailsRegister[5];
        const stayDuration = stayDurationInDay +" Day "+ stayDurationInHour +" Hours";
        console.log(`\n << Bill >> \n`);
        console.log(`Customer Name : ${customerName}\n`);
        console.log(`Duration Of Stay : ${stayDuration}\n`);
        console.log(`Charges Of Stay : Rs.${charges}\n`);
        console.log(`Your Orders : \n`);

        for (let key in ordersOfUser) {
            console.log(`Item Name : ${ordersOfUser[key].itemName}`);
            console.log(`Item Quantity : ${ordersOfUser[key].itemQuantity}`);
            console.log(`Item Price : Rs.${ordersOfUser[key].itemPrice}`);
            console.log(`Total Amount : Rs.${ordersOfUser[key].totalAmount}\n`);
            totalBill += ordersOfUser[key].totalAmount;
        }
        totalBill = totalBill + charges;
        console.log(`Total Bill : Rs.${totalBill}\n`);
        

        return totalBill;
    }
    generateReport(detailsRegister, ordersOfUser, totalBill) {
        const nameOfUser = detailsRegister[0].getCustomerName;
        const idOfUser = detailsRegister[0].getCustomerID;
        const checkInDate = detailsRegister[0].getCheckInDate;
        const checkOutDate = detailsRegister[0].getCheckOutDate;
        const stayDurationInDay = detailsRegister[3];
        const stayDurationInHour = detailsRegister[4];
        const stayDuration = stayDurationInDay +" Day "+ stayDurationInHour +" Hours"; 
        const charges = detailsRegister[5];

        const User = {
            NameOfUser : nameOfUser,
            UserID :     idOfUser,
            CheckInDate : checkInDate,
            CheckOutDate : checkOutDate,
            StayDuration : stayDuration,
            ChargesOfStay : charges, 
            OrdersOfUser : ordersOfUser,
            TotalBill : totalBill
        }

        this.writeDataInFile('./reports/repo.json', User)
    }
}

exports.LoadData = LoadData;