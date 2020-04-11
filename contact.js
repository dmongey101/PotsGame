function ShowHideSections(executionContext) {
	debugger;
	var formContext = executionContext.getFormContext();
	var var_at = formContext.getAttribute("dpms_assessmenttype").getValue();
	var tabObj = formContext.ui.tabs.get("general");
	var triagesection = tabObj.sections.get("triage");
	var initsection = tabObj.sections.get("initialassessment");
	var fusection = tabObj.sections.get("fuassessment");
	var ffsection = tabObj.sections.get("assessment");
	var pasection = tabObj.sections.get("positivepatientassess");
	var inpatient = tabObj.sections.get("inpatient_observation");
	var ambulatory = tabObj.sections.get("amb_Assess");
	var formType = formContext.ui.getFormType();
	var formCanBeEdited = 0;
	if (formType == 1 || formType == 2) formCanBeEdited = 1;

	//alert(var_at);

	if (var_at == null) {
		triagesection.setVisible(false);
		initsection.setVisible(false);
		fusection.setVisible(false);
		ffsection.setVisible(false);
		pasection.setVisible(false);
		inpatient.setVisible(false);
		ambulatory.setVisible(false);
		if (formCanBeEdited == 1) formContext.data.entity.save();
	}

	if (var_at != null) {


		if (var_at == 774460000) { //TRIAGE
			triagesection.setVisible(true);
			initsection.setVisible(false);
			fusection.setVisible(false);
			ffsection.setVisible(false);
			pasection.setVisible(false);
			inpatient.setVisible(false);
			ambulatory.setVisible(false);

			if (formCanBeEdited == 1) {
				formContext.getAttribute("dpms_cough").setRequiredLevel("required");
				formContext.getAttribute("dpms_chestpain").setRequiredLevel("required");
				formContext.getAttribute("dpms_fever").setRequiredLevel("required");
				formContext.getAttribute("dpms_shortnessofbreath").setRequiredLevel("required");
				formContext.getAttribute("dpms_homeoxygen").setRequiredLevel("required");
			}
		}
		else if (var_at == 774460001) { //Telephone Clinical Assessment
			triagesection.setVisible(false);
			initsection.setVisible(true);
			fusection.setVisible(false);
			ffsection.setVisible(false);
			pasection.setVisible(false);
			inpatient.setVisible(false);
			ambulatory.setVisible(false);

			if (formCanBeEdited == 1) {
				formContext.getAttribute("dpms_cough").setRequiredLevel("required");
				formContext.getAttribute("dpms_chestpain").setRequiredLevel("required");
				formContext.getAttribute("dpms_fever").setRequiredLevel("required");
				formContext.getAttribute("dpms_shortnessofbreath").setRequiredLevel("required");
				formContext.getAttribute("dpms_homeoxygen").setRequiredLevel("required");

				formContext.getAttribute("dpms_consciousness").setRequiredLevel("required");
				formContext.getAttribute("dpms_abdominalpain").setRequiredLevel("required");
				formContext.getAttribute("dpms_diarrhoea").setRequiredLevel("required");
				formContext.getAttribute("dpms_dizziness").setRequiredLevel("required");
				formContext.getAttribute("dpms_fatigue").setRequiredLevel("required");
				formContext.getAttribute("dpms_haemoptysis").setRequiredLevel("required");
				formContext.getAttribute("dpms_headache").setRequiredLevel("required");
				formContext.getAttribute("dpms_lossofappetite").setRequiredLevel("required");
				formContext.getAttribute("dpms_myalgia").setRequiredLevel("required");
				formContext.getAttribute("dpms_nauseavomiting").setRequiredLevel("required");
				formContext.getAttribute("dpms_rhinorrhea").setRequiredLevel("required");
				formContext.getAttribute("dpms_sorethroat").setRequiredLevel("required");
				formContext.getAttribute("dpms_sputumproduction").setRequiredLevel("required");
				formContext.getAttribute("dpms_aretheresignificantriskfactors").setRequiredLevel("required");
				formContext.getAttribute("dpms_telephoneassessmentoutcome").setRequiredLevel("required");
			}

		}
		else if (var_at == 774460002) { //FOLLOW UP ASSESSMENT
			triagesection.setVisible(false);
			initsection.setVisible(false);
			fusection.setVisible(true);
			ffsection.setVisible(false);
			pasection.setVisible(false);
			inpatient.setVisible(false);
			ambulatory.setVisible(false);

			if (formCanBeEdited == 1) {
				formContext.getAttribute("dpms_cough").setRequiredLevel("required");
				formContext.getAttribute("dpms_chestpain").setRequiredLevel("required");
				formContext.getAttribute("dpms_fever").setRequiredLevel("required");
				formContext.getAttribute("dpms_shortnessofbreath").setRequiredLevel("required");
				formContext.getAttribute("dpms_homeoxygen").setRequiredLevel("required");

				formContext.getAttribute("dpms_consciousness").setRequiredLevel("required");
				formContext.getAttribute("dpms_abdominalpain").setRequiredLevel("required");
				formContext.getAttribute("dpms_diarrhoea").setRequiredLevel("required");
				formContext.getAttribute("dpms_dizziness").setRequiredLevel("required");
				formContext.getAttribute("dpms_fatigue").setRequiredLevel("required");
				formContext.getAttribute("dpms_haemoptysis").setRequiredLevel("required");
				formContext.getAttribute("dpms_headache").setRequiredLevel("required");
				formContext.getAttribute("dpms_lossofappetite").setRequiredLevel("required");
				formContext.getAttribute("dpms_myalgia").setRequiredLevel("required");
				formContext.getAttribute("dpms_nauseavomiting").setRequiredLevel("required");
				formContext.getAttribute("dpms_rhinorrhea").setRequiredLevel("required");
				formContext.getAttribute("dpms_sorethroat").setRequiredLevel("required");
				formContext.getAttribute("dpms_sputumproduction").setRequiredLevel("required");
				formContext.getAttribute("dpms_aretheresignificantriskfactors").setRequiredLevel("required");
				formContext.getAttribute("dpms_telephoneassessmentoutcome").setRequiredLevel("required");
			}
		}
		else if (var_at == 774460003) { // HOME ASSESSMENT
			triagesection.setVisible(false);
			initsection.setVisible(false);
			fusection.setVisible(false);
			ffsection.setVisible(true);
			pasection.setVisible(false);
			inpatient.setVisible(false);
			ambulatory.setVisible(false);
		}
		else if (var_at == 774460004) { // HUB ASSESSMENT
			triagesection.setVisible(false);
			initsection.setVisible(false);
			fusection.setVisible(false);
			ffsection.setVisible(true);
			pasection.setVisible(false);
			inpatient.setVisible(false);
			ambulatory.setVisible(false);
		}
		else if (var_at == 774460005) { // POSITIVE PATIENT ASSESSMENT
			triagesection.setVisible(false);
			initsection.setVisible(false);
			fusection.setVisible(false);
			ffsection.setVisible(false);
			pasection.setVisible(true);
			inpatient.setVisible(false);
			ambulatory.setVisible(false);
			formContext.getAttribute("dpms_positiveassessmentoutcome").setRequiredLevel("required");

		}
		else if (var_at == 774460006) { // INPATIENT OBSERVATION
			triagesection.setVisible(false);
			initsection.setVisible(false);
			fusection.setVisible(false);
			ffsection.setVisible(false);
			pasection.setVisible(false);
			inpatient.setVisible(true);
			ambulatory.setVisible(false);
		}
		else if (var_at == 774460007) { // AMBULATORY ASSESSMENT
			triagesection.setVisible(false);
			initsection.setVisible(false);
			fusection.setVisible(false);
			ffsection.setVisible(false);
			pasection.setVisible(false);
			inpatient.setVisible(false);
			ambulatory.setVisible(true);
			formContext.getAttribute("dpms_ambulatoryassessmentoutcome").setRequiredLevel("required");
			formContext.getAttribute("dpms_respirationrate").setRequiredLevel("required");
			formContext.getAttribute("dpms_oxygensaturations").setRequiredLevel("required");
			formContext.getAttribute("dpms_systolicbloodpressure").setRequiredLevel("required");
			formContext.getAttribute("dpms_diastolicbloodpressure").setRequiredLevel("required");
			formContext.getAttribute("dpms_heartrate").setRequiredLevel("required");

			formContext.getAttribute("dpms_acvpucnsresponse").setRequiredLevel("required");
			formContext.getAttribute("dpms_temperature").setRequiredLevel("required");


		}
	}

}

function doLastNameUpperCase() {
	var currentValue = Xrm.Page.getAttribute("lastname").getValue();
	Xrm.Page.getAttribute("lastname").setValue(currentValue.toUpperCase());
}

function setScore(executionContext) {
	var formContext = executionContext.getFormContext();
	var formType = formContext.ui.getFormType();
	if (formType == 1 || formType == 2) // only fire if the form is in Create/Edit - do not fire if it is read-only
	{
		var assType = formContext.getAttribute("dpms_assessmenttype").getValue();
		var newScore = GenerateScore(formContext);
		if (assType == 774460000) { //TRIAGE
			formContext.getAttribute("dpms_triageassessmentscore").setValue(newScore);
			formContext.getAttribute("dpms_triageassessmentscore").setSubmitMode("always");
			if (newScore >= 1) {
				formContext.getAttribute("dpms_triageoutcome").setValue(774460001); // TELEPHONE ASSESSMENT REQUIRED
				formContext.getAttribute("dpms_triageoutcome").setSubmitMode("always"); // 
				formContext.getControl("dpms_triageoutcome").setDisabled(true);
			} else {
				formContext.getAttribute("dpms_triageoutcome").setValue(774460000); // NO FURTHER ACTION
				formContext.getAttribute("dpms_triageoutcome").setSubmitMode("always"); // 
				formContext.getControl("dpms_triageoutcome").setDisabled(false);
			}
		}
		else if (assType == 774460001) { //INITIAL ASSESSMENT
			formContext.getAttribute("dpms_assessmentscore").setValue(newScore);
			formContext.getAttribute("dpms_assessmentscore").setSubmitMode("always");
		}
		else if (assType == 774460002) { //FOLLOW UP ASSESSMENT
			formContext.getAttribute("dpms_assessmentscore").setValue(newScore);
			formContext.getAttribute("dpms_assessmentscore").setSubmitMode("always");
		}

		else if (assType == 774460007) { //AMBULATORY ASSESSMENT
			formContext.getAttribute("dpms_assessmentscore").setValue(newScore);
			formContext.getAttribute("dpms_assessmentscore").setSubmitMode("always");
		}


	}
}


function GenerateScore(formContext) {
	// YES = 774,460,001
	// NO = 774,460,000
	// UNKNOWN = 774,460,002

	// TRIAGE
	var newScore = 0;

	var scoreAbdominalPain = formContext.getAttribute("dpms_abdominalpain").getValue();
	if (scoreAbdominalPain == 774460001) newScore = newScore + 1;
	var scoreAge = formContext.getAttribute("dpms_agecalculated").getValue();
	if (scoreAge > 65) newScore = newScore + 3;
	var scoreChestPain = formContext.getAttribute("dpms_chestpain").getValue();
	if (scoreChestPain == 774460001) newScore = newScore + 3;
	var scoreConfusion = formContext.getAttribute("dpms_confusion").getValue();
	if (scoreConfusion == 774460001) newScore = newScore + 3;
	var scoreConciousness = formContext.getAttribute("dpms_consciousness").getValue();
	if (scoreConciousness == 774460001) newScore = newScore + 3; // DROWSINESS
	if (scoreConciousness == 774460002) newScore = newScore + 3; // LETHARGY
	if (scoreConciousness == 774460003) newScore = newScore + 3; // COMA
	if (scoreConciousness == 774460004) newScore = newScore + 3; // CONFUSION
	var scoreCough = formContext.getAttribute("dpms_cough").getValue();
	if (scoreCough == 774460001) newScore = newScore + 1;
	var scoreDiarrhoea = formContext.getAttribute("dpms_diarrhoea").getValue();
	if (scoreDiarrhoea == 774460001) newScore = newScore + 1;
	var scoreDizziness = formContext.getAttribute("dpms_dizziness").getValue();
	if (scoreDizziness == 774460001) newScore = newScore + 1;
	var scoreFatigue = formContext.getAttribute("dpms_fatigue").getValue();
	if (scoreFatigue == 774460001) newScore = newScore + 1;
	var scoreFever = formContext.getAttribute("dpms_fever").getValue();
	if (scoreFever == 774460001) newScore = newScore + 1;
	var scoreHaemoptysis = formContext.getAttribute("dpms_haemoptysis").getValue();
	if (scoreHaemoptysis == 774460001) newScore = newScore + 3;
	var scoreHeadache = formContext.getAttribute("dpms_headache").getValue();
	if (scoreHeadache == 774460001) newScore = newScore + 1;
	var scoreHomeOxygen = formContext.getAttribute("dpms_homeoxygen").getValue();
	if (scoreHomeOxygen == 774460001) newScore = newScore + 2;
	var scoreLossOfAppetite = formContext.getAttribute("dpms_lossofappetite").getValue();
	if (scoreLossOfAppetite == 774460001) newScore = newScore + 1;
	var scoreMyalgia = formContext.getAttribute("dpms_myalgia").getValue();
	if (scoreMyalgia == 774460001) newScore = newScore + 1;
	var scoreNauseaVomiting = formContext.getAttribute("dpms_nauseavomiting").getValue();
	if (scoreNauseaVomiting == 774460001) newScore = newScore + 1;
	var scoreRhinorrhea = formContext.getAttribute("dpms_rhinorrhea").getValue();
	if (scoreRhinorrhea == 774460001) newScore = newScore + 1;
	var scoreShortnessOfBreath = formContext.getAttribute("dpms_shortnessofbreath").getValue(); // 1
	if (scoreShortnessOfBreath == 774460001) newScore = newScore + 1;
	var scoreSigRiskFactors = formContext.getAttribute("dpms_aretheresignificantriskfactors").getValue();
	if (scoreSigRiskFactors == 774460001) newScore = newScore + 2;
	var scoreSoreThroat = formContext.getAttribute("dpms_sorethroat").getValue();
	if (scoreSoreThroat == 774460001) newScore = newScore + 1;
	var scoreSputum = formContext.getAttribute("dpms_sputumproduction").getValue();
	if (scoreSputum == 774460001) newScore = newScore + 1;

	return newScore;
}

function OnLoadDefaultAssessmentType(executionContext) {
	var formContext = executionContext.getFormContext();
	var formType = formContext.ui.getFormType();
	if (formType == 1) { // NEW ASSESSMENT
		getValidSecurityRoles(formContext);
	}
}

function checkIfUserHasSecurityRole(validSecurityRoles, formContext) {
	// Check if user has 'Clinician' or 'Sys Admin' role
	var userSettings = Xrm.Utility.getGlobalContext().userSettings;
	var securityRoles = userSettings.securityRoles;
	var isClinician = false;

	for (var i in validSecurityRoles) {
		if (securityRoles.indexOf(validSecurityRoles[i]) > -1) {
			isClinician = true;
			break;
		}
	}

	if (isClinician == false) {
		formContext.getControl("dpms_assessmenttype").setDisabled(true);
		formContext.getAttribute("dpms_assessmenttype").setSubmitMode("always");
		formContext.getAttribute("dpms_assessmenttype").setValue(774460000);
	}

}
function getValidSecurityRoles(formContext) {
	var validSecurityRoles = [];
	Xrm.WebApi.retrieveMultipleRecords("role", "?$select=roleid&$filter=contains(name, '%clinician%')").then(
		function success(result) {
			for (var i = 0; i < result.entities.length; i++) {
				var roleid = result.entities[i].roleid;
				validSecurityRoles.push(roleid);
			}
			checkIfUserHasSecurityRole(validSecurityRoles, formContext);
		},
		function (error) {
			console.log(error.message);
		}
	);

}

// function setinewsScore(executionContext) {
// 	debugger;
// 	var formContext = executionContext.getFormContext();
// 	var formType = formContext.ui.getFormType();
// 	if (formType == 1 || formType == 2) // only fire if the form is in Create/Edit - do not fire if it is read-only
// 	{
// 		var assType = formContext.getAttribute("dpms_assessmenttype").getValue();
// 		var inewsScore = GenerateiNEWSScore(formContext);
// 		if (assType == 774460007) { //AMBULATORY ASSESSMENT
// 			formContext.getAttribute("dpms_inewsscore").setValue(newScore);
// 			formContext.getAttribute("dpms_inewsscore").setSubmitMode("always");
// 		}


// 	}
// }

function setinewsScore(executionContext) {
    debugger;
	var formContext = executionContext.getFormContext();
	var formType = formContext.ui.getFormType();
	if (formType == 1 || formType == 2) // only fire if the form is in Create/Edit - do not fire if it is read-only
	{
		var assType = formContext.getAttribute("dpms_assessmenttype").getValue();
		var inewsScore = GenerateiNEWSScore(formContext);
		if (assType == 774460007 || assType == 774460006) { //AMBULATORY ASSESSMENT or Inpatient Observation
			formContext.getAttribute("dpms_inewsscore").setValue(inewsScore);
			formContext.getAttribute("dpms_inewsscore").setSubmitMode("always");
		}


	}
}

function GenerateiNEWSScore(formContext) {

	var inewsScore = 0;

	var scoreRespiratoryRate = formContext.getAttribute("dpms_respirationrate").getValue();
	if (scoreRespiratoryRate != null) {
		if (scoreRespiratoryRate <= 8) inewsScore = inewsScore + 3;
		if (scoreRespiratoryRate >= 9 && scoreRespiratoryRate <= 11) inewsScore = inewsScore + 1;
		if (scoreRespiratoryRate >= 12 && scoreRespiratoryRate <= 20) inewsScore = inewsScore + 0;
		if (scoreRespiratoryRate >= 21 && scoreRespiratoryRate <= 24) inewsScore = inewsScore + 2;
		if (scoreRespiratoryRate >= 25) inewsScore = inewsScore + 3;
	}

	var scoreOxygenSat = formContext.getAttribute("dpms_oxygensaturations").getValue();
	if (scoreOxygenSat != null) {
		if (scoreOxygenSat <= 91) inewsScore = inewsScore + 3;
		if (scoreOxygenSat >= 92 && scoreOxygenSat <= 93) inewsScore = inewsScore + 2;
		if (scoreOxygenSat >= 94 && scoreOxygenSat <= 95) inewsScore = inewsScore + 1;
		if (scoreOxygenSat >= 96) inewsScore = inewsScore + 0;
	}

	var scoreSystolicBP = formContext.getAttribute("dpms_systolicbloodpressure").getValue();
	if (scoreOxygenSat != null) {
		if (scoreSystolicBP <= 90) inewsScore = inewsScore + 3;
		if (scoreSystolicBP >= 91 && scoreSystolicBP <= 100) inewsScore = inewsScore + 2;
		if (scoreSystolicBP >= 101 && scoreSystolicBP <= 110) inewsScore = inewsScore + 1;
		if (scoreSystolicBP >= 111 && scoreSystolicBP <= 249) inewsScore = inewsScore + 0;
		if (scoreSystolicBP >= 250) inewsScore = inewsScore + 1;
	}

	var scoreHeartRate = formContext.getAttribute("dpms_heartrate").getValue();
	if (scoreHeartRate != null) {
		if (scoreHeartRate <= 40) inewsScore = inewsScore + 2;
		if (scoreHeartRate >= 41 && scoreHeartRate <= 50) inewsScore = inewsScore + 1;
		if (scoreHeartRate >= 51 && scoreHeartRate <= 90) inewsScore = inewsScore + 0;
		if (scoreHeartRate >= 91 && scoreHeartRate <= 110) inewsScore = inewsScore + 1;
		if (scoreHeartRate >= 111 && scoreHeartRate <= 130) inewsScore = inewsScore + 2;
		if (scoreHeartRate >= 131) inewsScore = inewsScore + 3;
	}


	var scoreTemperature = formContext.getAttribute("dpms_temperature").getValue();
	if (scoreTemperature != null) {
		if (scoreTemperature <= 35) inewsScore = inewsScore + 3;
		if (scoreTemperature >= 35.1 && scoreTemperature <= 36) inewsScore = inewsScore + 1;
		if (scoreTemperature >= 36.1 && scoreTemperature <= 38) inewsScore = inewsScore + 0;
		if (scoreTemperature >= 38.1 && scoreTemperature <= 39) inewsScore = inewsScore + 1;
		if (scoreTemperature >= 39.1) inewsScore = inewsScore + 2;
	}

	var scoreACVPUCNS = formContext.getAttribute("dpms_acvpucnsresponse").getValue();
	if (scoreACVPUCNS != null) {
		if (scoreACVPUCNS == 774460000) inewsScore = inewsScore + 0; //ALERT
		if (scoreACVPUCNS == 774460001) inewsScore = inewsScore + 3; //NEW CON
		if (scoreACVPUCNS == 774460002) inewsScore = inewsScore + 3; //VOICE
		if (scoreACVPUCNS == 774460003) inewsScore = inewsScore + 3; //PAIN
		if (scoreACVPUCNS == 774460004) inewsScore = inewsScore + 3; //UNRESP
	}

	var scoreFractionalInspiredOxygen = formContext.getAttribute("dpms_fractionalinspiredoxygen").getValue();
	if (scoreFractionalInspiredOxygen >= 22 && scoreFractionalInspiredOxygen <= 100) inewsScore = inewsScore + 3;


	return inewsScore;
}


function GenerateBMI(executionContext) {
	var formContext = executionContext.getFormContext();
	var bmiHeight = formContext.getAttribute("dpms_heightm").getValue();
	var bmiWeight = formContext.getAttribute("dpms_weight").getValue();

	if (bmiHeight != null && bmiWeight != null) {
		var finalBmi = bmiWeight / (bmiHeight * bmiHeight)

		formContext.getAttribute("dpms_bmi").setValue(finalBmi);

	}
}


// ------------------- Care Facility app -----------------------

function onFormLoadRemoveOptions(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("dpms_assessmenttype").setValue(774460006)
    var tabObj = formContext.ui.tabs.get("general");
    var inpatient = tabObj.sections.get("inpatient_observation").setVisible(true);
    
    formContext.getControl("dpms_assessmenttype").removeOption(774460000)
    formContext.getControl("dpms_assessmenttype").removeOption(774460001)
    formContext.getControl("dpms_assessmenttype").removeOption(774460005)
    formContext.getControl("dpms_assessmenttype").removeOption(774460007)

}

function ShowHideSectionsCareFacility(executionContext) {
    var formContext = executionContext.getFormContext();
    var tabObj = formContext.ui.tabs.get("general");
    var inpatient = tabObj.sections.get("inpatient_observation");
    var var_at = formContext.getAttribute("dpms_assessmenttype").getValue();
    var formType = formContext.ui.getFormType();
    var formCanBeEdited = 0;
	if (formType == 1 || formType == 2) formCanBeEdited = 1;

    if (var_at == 774460006) {
        inpatient.setVisible(true);
    }
    if (formCanBeEdited == 1) formContext.data.entity.save();
}