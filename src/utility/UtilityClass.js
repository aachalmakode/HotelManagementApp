const pmpt = require("prompt-sync")();
const custo = require('./CustomerDetails');


const customerDetailsObj = new custo.CustomerDetails();

class UtilityClass {

    genrateKeyForUser(firstName, userMobile) {
        const userKey = firstName.substring(0, 4) + userMobile.substring(0, 4);
        return userKey;
    }

    registerUser() {
        console.log(`\n <<<Hotel Management System>>>`);
        console.log(`\n Registration \n`);
        customerDetailsObj.setFirstName = pmpt(`Enter First Name : `);
        customerDetailsObj.setLastName = pmpt(`Enter Last Name : `);
        customerDetailsObj.setUserGender = pmpt('Enter Gender : ')
        customerDetailsObj.setUserMobNo = pmpt('Enter Mobile Number : ');
        const userKey = this.genrateKeyForUser(customerDetailsObj.getFirstName, customerDetailsObj.getUserMobNo);
        customerDetailsObj.setUserID = userKey;
        console.log(`\n<<<REGISTRATION DONE SUCCESSFULLY>>>`);
        console.log(`<<<YOUR LOGIN KEY>>> : ${userKey}`);
        return customerDetailsObj;
    }

    showAdminLoginMenu() {
        let flag = true;
        console.log(`\n <<<WELCOME TO PALACE HOTEL ${userKey}>>> n`);
        console.log(` ADMIN To WELCOME TO PALACE HOTELn`);
        while(flag) {    
            console.log('1. Print Report');
            console.log(`2. Logout`);
            const adminChoice = + pmpt(`Enter 1 / 2 : `);
            if (adminChoice > 0 && adminChoice < 3) {
                flag = false;
                return adminChoice;
            }
            else {
                console.log('Incorrect Option...Enter Only 1 OR 2');
            }
        }
        return null;
    }

    showLoginOptions() {
        let flag = true;
        let userLoginId = 0;
        let loginChoice = 0;
        while (flag) {
            console.log(`\n <<<< WELCOME TO  PALACE HOTEL >>>> \n\n 1. ADMIN LOGIN \n 2. CUSTOMER LOGIN \n`);
            loginChoice = pmpt(`Enter Login Type (1/2) : `);
            switch (loginChoice) {
                case "1":
                    console.log(`\n ADMIN LOGIN \n`);
                    userLoginId = pmpt(`Enter Your Key : `);
                    flag = false;
                    break;
                case "2":
                    console.log(`\n User Login \n`);
                    userLoginId = pmpt(`Enter Your Key : `);
                    flag = false;
                    break;
                default:
                    console.log(`\nEnter 1 or 2 only`);
                    break;
            }
        }
        return userLoginId;
    }

    userOperationMenu() {
        console.log(`\n1. FOOD MENU`);
         console.log(`2. CHECK-OUT\n`);
    }

    showFoodOrderMenu() {
        let flag = true;
        while (flag) {
            console.log("\n SPECIAL MENU");
            console.log("\n FoodItem        Price");
            console.log("\n 1. Tea          Rs.25/-");
            console.log("\n 2. Hot Coffee   Rs.40/-");
            console.log("\n 3. Cold Coffee      Rs.150/-");
            console.log(" 4. Breakfast    Rs.80/-");
            console.log(" 5. Lunch        Rs.180/-");
            console.log(" 6. Dinner       Rs.200/-\n");
            const selectFood =+ pmpt(`Press 1 - 6 According To FoodItem : `);
            if (selectFood > 0 && selectFood <= 6 ) {
                flag = false;
                return selectFood;
            }
        }
        return null;
    }
}
exports.UtilInput = UtilityClass;
