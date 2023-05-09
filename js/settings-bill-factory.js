function billWithSettings() {
  var theCallCost = 0;
  var theSMSCost = 0;
  var theWarningLevel = 0;
  var theCriticalLevel = 0;

  var callCostTotal = 0;
  var smsCostTotal = 0;

  function setCallCost(callCost) {
    theCallCost = callCost;
  }

  function getCallCost() {
    return Number(theCallCost);
  }

  function setSMSCost(smsCost) {
    theSMSCost = smsCost;
  }

  function getSMSCost() {
    return Number(theSMSCost);
  }

  function setWarningLevel(warningLevel) {
    theWarningLevel = warningLevel;
  }

  function getWarningLevel() {
    return Number(theWarningLevel);
  }

  function setCriticalLevel(criticalLevel) {
    theCriticalLevel = criticalLevel;
  }

  function getCriticalLevel() {
    return Number(theCriticalLevel);
  }

  function makeCall() {
    if(!hasReachedCriticalLevel()) {
      callCostTotal += Number(theCallCost);
    }
  }

  function sendSMS() {
    if(!hasReachedCriticalLevel()) {
      smsCostTotal += Number(theSMSCost);
    }
  }

  function getTotalCost() {
    return callCostTotal + smsCostTotal;
  }

  function getTotalCallCost() {
    return callCostTotal;
  }

  function getTotalSMSCost() {
    return smsCostTotal
  }

  function hasReachedCriticalLevel() {
    return getTotalCost() >= getCriticalLevel();
  }
  function totalClassName() {
    if(hasReachedCriticalLevel()){
      return "critical";
    }
    else if(getTotalCost() >= getWarningLevel()){      
      return "warning";
    }
  }

  return {
    setCallCost,
    getCallCost,
    setSMSCost,
    getSMSCost ,
    setWarningLevel,
    getWarningLevel,
    setCriticalLevel,
    getCriticalLevel,
    makeCall,
    sendSMS,
    getTotalCost,
    getTotalCallCost,
    getTotalSMSCost,
    totalClassName
  };
}