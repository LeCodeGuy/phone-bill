// get a reference to the sms or call radio buttons
const billItemTypeRadioElem = document.querySelector(".billItemTypeRadio");

const callTotalTwoElem = document.querySelector(".callTotalTwo");
const smsTotalTwoElem = document.querySelector(".smsTotalTwo");
const totalTwoElem = document.querySelector(".totalTwo");
//get a reference to the add button
const radioBillAddBtnElem = document.querySelector(".radioBillAddBtn");

//create a variable that will keep track of the total bill
var callsTotal = 0;
var smsTotal = 0;
//add an event listener for when the add button is pressed
radioBillAddBtnElem.addEventListener('click', radioBillTotal);

//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the running total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen
function radioBillTotal(){    
    // get the value entered in the billType textfield
    var checkedRadioBtn = document.querySelector("input[name='billItemType']:checked");
    
    // update the correct total
    if (checkedRadioBtn){
        var billItem = checkedRadioBtn.value
        // billItemType will be 'call' or 'sms'
        if (billItem === "call"){
            callsTotal += 2.75
        }
        else if (billItem === "sms"){
            smsTotal += 0.75;
        }
        
        //update the totals that is displayed on the screen.
        callTotalTwoElem.innerHTML = callsTotal.toFixed(2);
        smsTotalTwoElem.innerHTML = smsTotal.toFixed(2);
        
        var totalCost = callsTotal + smsTotal;
        totalTwoElem.innerHTML = totalCost.toFixed(2);
        
        //color the total based on the criteria
        if (totalCost >= 50){
            // removes the warning class before adding danger class
            // * this is being done as forward planning for when we decide we want to remove a bill record again
            totalTwoElem.classList.remove("warning");
    
            // adding the danger class will make the text red
            totalTwoElem.classList.add("danger");
        }
        else if (totalCost >= 30){
            // adding the warning class will make the text orange
            totalTwoElem.classList.add("warning");
        }
    }
    
}