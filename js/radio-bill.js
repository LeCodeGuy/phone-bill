// get a reference to the sms or call radio buttons
const billItemTypeRadioElem = document.querySelector(".billItemTypeRadio");

const callTotalTwoElem = document.querySelector(".callTotalTwo");
const smsTotalTwoElem = document.querySelector(".smsTotalTwo");
const totalTwoElem = document.querySelector(".totalTwo");
//get a reference to the add button
const radioBillAddBtnElem = document.querySelector(".radioBillAddBtn");

//create a variable that will keep track of the total bill
var callsTotalRadio = 0;
var smsTotalRadio = 0;
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
            callsTotalRadio += 2.75
        }
        else if (billItem === "sms"){
            smsTotalRadio += 0.75;
        }
        
        //update the totals that is displayed on the screen.
        callTotalTwoElem.innerHTML = callsTotalRadio.toFixed(2);
        smsTotalTwoElem.innerHTML = smsTotalRadio.toFixed(2);
        
        var totalCostRadio = callsTotalRadio + smsTotalRadio;
        totalTwoElem.innerHTML = totalCostRadio.toFixed(2);
        
        //color the total based on the criteria
        if (totalCostRadio >= 50){
            // removes the warning class before adding danger class
            // * this is being done as forward planning for when we decide we want to remove a bill record again
            totalTwoElem.classList.remove("warning");
    
            // adding the danger class will make the text red
            totalTwoElem.classList.add("danger");
        }
        else if (totalCostRadio >= 30){
            // adding the warning class will make the text orange
            totalTwoElem.classList.add("warning");
        }
    }
    
}