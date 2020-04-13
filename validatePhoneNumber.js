function phoneValidation(executionContext, fieldName) {
	debugger;
	if (executionContext == null || fieldName == null) return;

	var formContext = executionContext.getFormContext(); // get formContext
	var phoneNumber = formContext.getAttribute(fieldName).getValue();
    var myControl = formContext.getControl(fieldName);

	if (phoneNumber == null) return;
    phoneNumber = phoneNumber.replace(' ', '');

    var RegExpression = 08[35679]-\d{7};
    if (phoneNumber.toString().startsWith("08")) {
        if (!phoneNumber.toString().match(RegExpression)) {
            myControl.addNotification({
            messages: ['Phone Number Invalid. Correct format: 0861234567'],
            notificationLevel: 'ERROR',
            uniqueId: 'phoneNumber'
            });
        } else {
            myControl.clearNotification('phoneNumber');
        }
    }


    if (phoneNumber.toString().startsWith("+44")) {
        if (phoneNumber.length != 12 && phoneNumber.length != 13) {
            myControl.addNotification({
                messages: ['Phone Number Invalid. Correct format: +44123456789'],
                notificationLevel: 'ERROR',
                uniqueId: 'phoneNumber'
            });
        } else {
		    myControl.clearNotification('phoneNumber');
	    }
    }

    if (phoneNumber.toString().startsWith("0044")) {
        if (phoneNumber.length != 13 && phoneNumber.length != 14) {
            myControl.addNotification({
                messages: ['Phone Number Invalid. Correct format: 0044123456789'],
                notificationLevel: 'ERROR',
                uniqueId: 'phoneNumber'
            });
        } else {
		    myControl.clearNotification('phoneNumber');
	    }
    }

    if (!phoneNumber.toString().startsWith("0044") || !phoneNumber.toString().startsWith("+44") || !phoneNumber.toString().startsWith("08")) {
        myControl.addNotification({
                messages: ['Phone Number Invalid. Correct format: 0044123456789'],
                notificationLevel: 'ERROR',
                uniqueId: 'phoneNumber'
            });
    } else {
		    myControl.clearNotification('phoneNumber');
	    }
}

