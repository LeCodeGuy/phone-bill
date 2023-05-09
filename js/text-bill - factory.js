// get a reference to the textbox where the bill type is to be entered
const billTypeTextElem = document.querySelector(".billTypeText");

//get a reference to the add button
const addToBillBtnElem = document.querySelector(".addToBillBtn");

//create a variable that will keep track of the total bill
const callTotalOneElem = document.querySelector(".callTotalOne");
const smsTotalOneElem = document.querySelector(".smsTotalOne");
const totalOneElem = document.querySelector(".totalOne");
// these variables are global and defined outside of the Add button event listener.
var callsTotal = 0;
var smsTotal = 0;

//add an event listener for when the add button is pressed
addToBillBtnElem.addEventListener('click', textBillTotal);

//in the event listener check if the value in the bill type textbox is 'sms' or 'call'
// * add the appropriate value to the running total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen
function textBillTotal(){
    // get the value entered in the billType textfield
    var billTypeEntered = billTypeTextElem.value.trim().toLowerCase();
    
    // update the correct total
    if (billTypeEntered === "call"){
        callsTotal += 2.75
    }
    else if (billTypeEntered === "sms"){
        smsTotal += 0.75;
    }
    
    //update the totals that is displayed on the screen.
    callTotalOneElem.innerHTML = callsTotal.toFixed(2);
    smsTotalOneElem.innerHTML = smsTotal.toFixed(2);
    
    var totalCost = callsTotal + smsTotal;
    totalOneElem.innerHTML = totalCost.toFixed(2);
    
    //color the total based on the criteria
    if (totalCost >= 50){
        // removes the warning class before adding danger class
        // * this is being done as forward planning for when we decide we want to remove a bill record again
        totalOneElem.classList.remove("warning");

        // adding the danger class will make the text red
        totalOneElem.classList.add("danger");
    }
    else if (totalCost >= 30){
        // adding the warning class will make the text orange
        totalOneElem.classList.add("warning");
    }
}
