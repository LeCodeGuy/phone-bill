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

// create a variables that will keep track of all three totals.
const callTotalSettingsElem = document.querySelector(".callTotalSettings");
const smsTotalSettingsElem = document.querySelector(".smsTotalSettings");
const totalSettingsElem = document.querySelector(".totalSettings");

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

  setTotalColor();
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
      settingsFactory.makeCall();
    } else if (billItem === "sms") {
      settingsFactory.sendSMS();
    }

    //update the totals that is displayed on the screen.
    callTotalSettingsElem.innerHTML = settingsFactory.getTotalCallCost().toFixed(2);
    smsTotalSettingsElem.innerHTML = settingsFactory.getTotalSMSCost().toFixed(2);
    totalSettingsElem.innerHTML = settingsFactory.getTotalCost().toFixed(2); //overallTotalSettings.toFixed(2);

    setTotalColor();
  }
}

function setTotalColor() {
    totalSettingsElem.classList.remove("danger");
    totalSettingsElem.classList.remove("warning");
    totalSettingsElem.classList.add(settingsFactory.totalClassName())
}
