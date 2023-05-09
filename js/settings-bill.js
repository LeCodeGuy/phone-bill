// get a reference to the sms or call radio buttons
const billItemTypeWithSettingsElem = document.querySelector(
  ".billItemTypeWithSettings"
);

// get refences to all the settings fields
const callCostSettingElem = document.querySelector(".callCostSetting");
const smsCostSettingElem = document.querySelector(".smsCostSetting");
const warningLevelSettingElem = document.querySelector(".warningLevelSetting");
const criticalLevelSettingElem = document.querySelector(
  ".criticalLevelSetting"
);

//get a reference to the add button
const settingsBillAddBtnElem = document.querySelector(".settingsAddBtn");

//get a reference to the 'Update settings' button
const settingsBillUpdateBtnElem = document.querySelector(".updateSettings");

// instantiate Factory function
const settingsFactory = billWithSettings();

// create a variables that will keep track of all the settings
var callCostSettingVal = 0;
var smsCostSettingVal = 0;
var warningLevelSettingVal = 0;
var criticalLevelSettingVal = 0;

// create a variables that will keep track of all three totals.
const callTotalSettingsElem = document.querySelector(".callTotalSettings");
const smsTotalSettingsElem = document.querySelector(".smsTotalSettings");
const totalSettingsElem = document.querySelector(".totalSettings");

var callsTotalSettings = 0;
var smsTotalSettings = 0;
var overallTotalSettings = 0;
//add an event listener for when the 'Update settings' button is pressed
settingsBillUpdateBtnElem.addEventListener("click", updateBillSettings);

//add an event listener for when the add button is pressed
settingsBillAddBtnElem.addEventListener("click", billWithSettingsTotal);

//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the call / sms total
// * add the appropriate value to the overall total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen.
// * check the value thresholds and display the total value in the right color.
function updateBillSettings() {
  settingsFactory.setCallCost(callCostSettingElem.value);
  settingsFactory.setSMSCost(smsCostSettingElem.value);
  settingsFactory.setWarningLevel(warningLevelSettingElem.value);
  settingsFactory.setCriticalLevel(criticalLevelSettingElem.value);

  callCostSettingVal = settingsFactory.getCallCost();
  smsCostSettingVal = settingsFactory.getSMSCost()
  warningLevelSettingVal = settingsFactory.getWarningLevel();
  criticalLevelSettingVal = settingsFactory.getCriticalLevel();

  console.log(callCostSettingVal);
  console.log(smsCostSettingVal);
  console.log(warningLevelSettingVal);
  console.log(criticalLevelSettingVal);

  //setTotalColor();
  settingsFactory.totalClassName();
}

function billWithSettingsTotal() {
  // get the value entered in the billType textfield
  var checkedRadioBtn = document.querySelector(
    "input[name='billItemTypeWithSettings']:checked"
  );

  // update the correct total
  if (checkedRadioBtn) {
    var billItem = checkedRadioBtn.value;
    // billItemType will be 'call' or 'sms'
    if (billItem === "call") {
      //callsTotalSettings += parseFloat(callCostSettingVal); //converts the string value to a numeric value before adding
      settingsFactory.makeCall();
    } else if (billItem === "sms") {
      //smsTotalSettings += parseFloat(smsCostSettingVal); //converts the string value to a numeric value before adding
      settingsFactory.sendSMS();
    }

    //update the totals that is displayed on the screen.
    callTotalSettingsElem.innerHTML = settingsFactory.getTotalCallCost().toFixed(2);
    smsTotalSettingsElem.innerHTML = settingsFactory.getTotalSMSCost().toFixed(2);

    //overallTotalSettings = callsTotalSettings + smsTotalSettings;
    totalSettingsElem.innerHTML = settingsFactory.getTotalCost().toFixed(2); //overallTotalSettings.toFixed(2);

    //setTotalColor();
    settingsFactory.totalClassName();
  }
}

function setTotalColor() {
  //color the total based on the criteria
  if (criticalLevelSettingVal === 0 || warningLevelSettingVal === 0) {
    alert("Please update the settings before trying to add to the bill");
  } else if (overallTotalSettings >= criticalLevelSettingVal) {
    // removes the warning class before adding danger class
    totalSettingsElem.classList.remove("danger");
    totalSettingsElem.classList.remove("warning");

    // adding the danger class will make the text red
    totalSettingsElem.classList.add("danger");

    // removes the event listener from the add button as soon as critical levels are reached
    settingsBillAddBtnElem.removeEventListener("click", billWithSettingsTotal);

    // greys out the button
    settingsBillAddBtnElem.classList.add("disableBtn");
  } else if (overallTotalSettings >= warningLevelSettingVal) {
    // removes the danger and warning classes before adding warning class
    totalSettingsElem.classList.remove("danger");
    totalSettingsElem.classList.remove("warning");

    // adding the warning class will make the text orange
    totalSettingsElem.classList.add("warning");

    // adds the event listener from the add button once it is below the critical level
    settingsBillAddBtnElem.addEventListener("click", billWithSettingsTotal);

    // removes the disbaleBtn class to activate the button again
    settingsBillAddBtnElem.classList.remove("disableBtn");
  } else {
    // removes the danger and warning classes to cater for instances where their settings
    // are updated and do not meet the previous conditions
    totalSettingsElem.classList.remove("danger");
    totalSettingsElem.classList.remove("warning");

    // removes the disbaleBtn class to activate the button again
    settingsBillAddBtnElem.classList.remove("disableBtn");
  }
}
