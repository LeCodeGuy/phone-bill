describe('Set the values', function(){
    it("should be able to set the Call cost", function(){
        let settingsBill = billWithSettings();

        settingsBill.setCriticalLevel(10); 
        settingsBill.setCallCost(1.85);
        assert.equal(1.85, settingsBill.getCallCost());

        let settingsBill2 = billWithSettings();
        
        settingsBill2.setCallCost(2.75);
        assert.equal(2.75, settingsBill2.getCallCost());
    });

    it("should be able to set the SMS cost", function(){
        let settingsBill = billWithSettings();

        settingsBill.setCriticalLevel(10); 
        settingsBill.setSMSCost(0.85);
        assert.equal(0.85, settingsBill.getSMSCost());

        let settingsBill2 = billWithSettings();
        
        settingsBill2.setSMSCost(0.75);
        assert.equal(0.75, settingsBill2.getSMSCost());
    });

    it("should be able to set the SMS and Call cost", function(){
        let settingsBill = billWithSettings();

        settingsBill.setCriticalLevel(10); 
        settingsBill.setCallCost(2.75);
        settingsBill.setSMSCost(0.85);

        assert.equal(2.75, settingsBill.getCallCost());
        assert.equal(0.85, settingsBill.getSMSCost());

        let settingsBill2 = billWithSettings();

        settingsBill2.setCallCost(1.75);
        settingsBill2.setSMSCost(0.65);
        
        assert.equal(1.75, settingsBill2.getCallCost());
        assert.equal(0.65, settingsBill2.getSMSCost());
    });

    it("should be able to set the Warning level", function(){
        let settingsBill = billWithSettings();

        settingsBill.setWarningLevel(20);
        assert.equal(20, settingsBill.getWarningLevel());
    });

    it("should be able to set the Critical level", function(){
        let settingsBill = billWithSettings();

        settingsBill.setCriticalLevel(30);
        assert.equal(30, settingsBill.getCriticalLevel());
    });

    it("should be able to set the Warning and Critical level", function(){
        let settingsBill = billWithSettings();

        settingsBill.setWarningLevel(15);
        settingsBill.setCriticalLevel(25);

        assert.equal(15, settingsBill.getWarningLevel());
        assert.equal(25, settingsBill.getCriticalLevel());

    });
});

describe('Use the values', function() {
    it('should be able to use the call cost set', function() {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(2.25);
        settingsBill.setSMSCost(0.85);
        settingsBill.setCriticalLevel(10); 

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(6.75, settingsBill.getTotalCost());
        assert.equal(6.75, settingsBill.getTotalCallCost());
        assert.equal(0.00, settingsBill.getTotalSMSCost());
    });

    it('should be able to use the call cost set for 2 calls at 1.35 each ', function() {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSMSCost(0.85);
        settingsBill.setCriticalLevel(10); 

        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(2.70, settingsBill.getTotalCost());
        assert.equal(2.70, settingsBill.getTotalCallCost());
        assert.equal(0.00, settingsBill.getTotalSMSCost());
    });

    it("should be able to send 2 sms's at 0.85 each", function() {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSMSCost(0.85);
        settingsBill.setCriticalLevel(10); 

        settingsBill.sendSMS();
        settingsBill.sendSMS();

        assert.equal(1.70, settingsBill.getTotalCost());
        assert.equal(0.00, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSMSCost());
    });

    it("should be able to send 2 sms's at 0.85 each and 1 call at 1.35", function() {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSMSCost(0.85);
        settingsBill.setCriticalLevel(10); 

        settingsBill.makeCall();
        settingsBill.sendSMS();
        settingsBill.sendSMS();

        assert.equal(3.05, settingsBill.getTotalCost());
        assert.equal(1.35, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSMSCost());
    });
});

describe("Warning and Critical Levels", function() {
    it("should return a class name of 'warning' if warning level is reached",function() {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSMSCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.sendSMS();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.sendSMS();

        assert.equal("warning",settingsBill.totalClassName());
    })

    it("should return a class name of 'critical' if critical level is reached",function() {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(2.50);
        settingsBill.setSMSCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();  

        assert.equal("critical",settingsBill.totalClassName());
        assert.equal(10,settingsBill.getTotalCallCost());
    })

    it("should allow the total to increase after reaching the critical level and then upping the critical level",function() {
        let settingsBill = billWithSettings();

        settingsBill.setCallCost(2.50);
        settingsBill.setSMSCost(0.85);
        settingsBill.setWarningLevel(8);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall(); 
        settingsBill.makeCall();  

        assert.equal("critical",settingsBill.totalClassName());
        assert.equal(10,settingsBill.getTotalCallCost());

        settingsBill.setWarningLevel(8);
        settingsBill.setCriticalLevel(20);

        assert.equal("warning",settingsBill.totalClassName());
        settingsBill.makeCall();
        settingsBill.makeCall();
        assert.equal(15,settingsBill.getTotalCallCost());
        settingsBill.makeCall();
        settingsBill.makeCall(); 
        settingsBill.makeCall();

        assert.equal("critical",settingsBill.totalClassName());
        assert.equal(20,settingsBill.getTotalCallCost());
    })  
})