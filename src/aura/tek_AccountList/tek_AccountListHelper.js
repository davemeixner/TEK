({
    getData : function(cmp) {
        var action = cmp.get('c.getAccounts');
        action.setCallback(this, $A.getCallback(function(response) {
            var state = response.getState();
            console.log(response.getReturnValue());
            if (state === "SUCCESS") {
                var accounts = response.getReturnValue();
                cmp.set('v.Accounts', accounts);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    
    updateAccount : function(cmp, account){
		var self = this;
       	var action = cmp.get('c.updateAccount');
        
        action.setParam("draftAccount", account);
        
		action.setCallback(this, $A.getCallback(function (response) {
			var state = response.getState();
            
           if (state === "SUCCESS") {
               var returnValue = response.getReturnValue();
               console.log('SUCCESS');
               if (returnValue.length > 0) {
                   cmp.set('v.error', returnValue);
                   console.log(returnValue);
               } else {
                   cmp.set('v.error', '');
                   console.log('no error');
               }
           } else if (state === "ERROR") {
               var errors = response.getError();
               console.error(errors);
               console.log('ERROR');
           }
        }));
        
        $A.enqueueAction(action);
                                      
    }
})