const pmpt = require("prompt-sync")();
const util = require('./src/utility/UtilityClass.js');
const lo = require('./src/utility/LoadData.js');

const utilInput = new util.UtilInput();
const loaddata = new lo.LoadData();

console.log(`\n <<<WELCOME TO PALACE HOTEL>>> \n`);

let flag = true;
while (flag) {
    const userResponse = pmpt(`Are You Register User (Y or N) : `);

    if (userResponse.toLowerCase() === 'n') {
        const userDetails = utilInput.registerUser();
       loaddata.writeDataInFile('./json/entry.json', userDetails);
       loaddata.loginCustomer();
        flag = false;
    }
    else if (userResponse.toLowerCase() === 'y') {
       loaddata.loginCustomer();
        flag = false;
    }
    else {
        console.log(`\nIncorrect Input.. Enter Y or N`);
        flag = true;
    }
}
