public with sharing class tek_AccountListApexController {

    
    @AuraEnabled
    public static List<Account> getAccounts() {
        //-- get 10 most recently created accounts
        List<Account> accounts = 
                [SELECT Id, Name, Phone, Type FROM Account ORDER BY CreatedDate DESC LIMIT 10];
        return accounts;
    }

    
    @AuraEnabled
    public static String updateAccount(Account draftAccount) {
        string response = '';
        system.debug('---updateAccount');
        //--- extremely basic error handling    
        try {
           update draftAccount; 
           response = '';
           system.debug('---saved');
        }
        catch (DmlException e)
        {
           system.debug(e);
           response = e.getMessage();
        }
        return response;
    }

     
}