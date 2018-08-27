/**
* @author       D. Meixner 
* @description  trigger developed for TEK Systems Optum test
* @testclass    n/a
*/ 
trigger contactTrigger on Contact (After insert, After Update, After delete, After undelete)  { 

    //--- UPDATE CONTACT COUNT IN RELATED ACCOUNT OBJECT ---------------------------

    Set<Id> parentIDs = new Set<Id>();
    List<Account> accountsToUpdate = new List<Account>();

    //--- build a list of accounts to update ---
  
    if (Trigger.IsAfter){
        if(Trigger.IsInsert || Trigger.isUpdate || Trigger.IsUndelete){
            FOR(Contact c : Trigger.new){
                if(c.AccountId != null){   
                   parentIDs.add(c.AccountId); 
                }
            }
        }
        else if (Trigger.IsDelete){
            for (Contact c : Trigger.Old){
                if(c.AccountId != null){   
                   parentIDs.add(c.AccountId); 
                }
            }
        }
    }

    //--- update account record with contact counts ---

    List<Account> accountList = new List<Account>([Select id, Number_of_Contacts__c, (Select id From Contacts) from Account Where id in:parentIDs ]);

    for (Account acc : accountList){
        List<Contact> contactList = acc.Contacts;
        acc.Number_of_Contacts__c = contactList.size();
        accountsToUpdate.add(acc);
    }

    update accountsToUpdate;

}