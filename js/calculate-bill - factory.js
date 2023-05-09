//get a reference to the calculate button
let calculateBtn = document.querySelector(".calculateBtn");

//get a reference to the billTotal element
let billTotalElement = document.querySelector(".billTotal");

//get a reference to the billString
let billStringElement = document.querySelector(".billString");

//create the function that will be called when the calculate button is pressed
//  * this function should read the string value entered - split it on a comma.
//  * loop over all the entries in the the resulting list
//  * check if it is a call or an sms and add the right amount to the overall total
//  * once done looping over all the entries - display the total onto the screen in the billTotal element
function calculateBtnClicked(){
    // get the string entered in the textArea
    var billString = billStringElement.value;
    
    //split the string
    var billItems = billString.split(",");
    // a variable for the total phone bill.
    var billTotal = 0;
    //loop over all the bill items
    for (var i=0;i<billItems.length;i++){
        var billItem = billItems[i].trim().toLowerCase();
        if (billItem === "call"){
            billTotal += 2.75;
        }
        else if (billItem === "sms"){
            billTotal += 0.75;
        }
    }
    
    //round to two decimals
    var roundedBillTotal = billTotal.toFixed(2);
    billTotalElement.innerHTML = roundedBillTotal;

    //color the total based on the criteria
    if (roundedBillTotal >= 30){
        // removes the warning class before adding danger class
        // * this is being done as forward planning for when we decide we want to remove a bill record again
        billTotalElement.classList.remove("warning");

        // adding the danger class will make the text red
        billTotalElement.classList.add("danger");
    }
    else if (roundedBillTotal >= 20){
        // removes the danger class before adding warning class
        // this is to cater for changes that might be made to the billing string between button clicks.
        billTotalElement.classList.remove("danger");
        // adding the warning class will make the text orange
        billTotalElement.classList.add("warning");
    }
    else{
        billTotalElement.classList.remove("warning");
        billTotalElement.classList.remove("danger");
    }
}

//link the function to a click event on the calculate button
calculateBtn.addEventListener('click', calculateBtnClicked);