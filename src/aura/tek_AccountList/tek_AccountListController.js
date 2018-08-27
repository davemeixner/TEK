({
	doInit: function(component, event, helper) {
        component.set("v.isOpen", false);
		helper.getData(component);
	},
    
    openModel: function(component, event, helper) {
        var account = event.getSource().get('v.value');
        component.set('v.targetAccount', account);
        component.set('v.orgName', account.name);
        
        //--- Display Editor dialog
        component.set("v.isOpen", true);
   	},
 
    closeModel: function(component, event, helper) {
        var undoName = component.get("v.orgName");
        var account = component.get("v.targetAccount");
        account.name = undoName;
        
        //-- Close Editor dialog
        component.set("v.isOpen", false);
    },
   
    
    saveAccount: function(component, event, helper) {
        var valid = component.find('editAccountForm').get('v.validity').valid;
        
        //--- save if valid
        if(valid){
            // update the account
            var account = component.get("v.targetAccount");
            helper.updateAccount(component, account);
            
            component.set("v.isOpen", false);
			helper.getData(component);
        }
    }
    
})