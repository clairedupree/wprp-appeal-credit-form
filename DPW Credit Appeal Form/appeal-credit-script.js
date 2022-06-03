/**
 * @author Claire Dupree
 * @since 04/26/22
 * 
 * @todo finish jsdoc comments
 * @todo go back thru git and document tutorials used throughout process ith @tutorial
 * @todo change #ctedit and #appeal to creditSleect anf #appealSelect
 */


const form = document.getElementById('wprfApplication');
let selected = []; //user selection array
const jsonData = {}; //json submit object
const cmObject = { //case manager object
  caseTypeUUID: '6d788088-0501-4db3-82b2-9a72bf61820f',
  jsonData: jsonData,
}; 
let fileUploads, attachment = []; //supporting documentation
//boolean variables for populating credit type 1 json data
let c1GradingPermitForm, c1InstallerForm, c1TreatmentDescriptionForm, c1FeeAgreementForm = false;


/**
 * Appends HTML markup to designated div tags, depending on
 * the value of the calling element.
 * @param {object} element The calling element's id or name attribute
 */
function toggleDivs(element) {
  switch(element) {
    case 'constituentDifferent':
      if (document.getElementById("constituentDifferentYes").checked) {
        $("#constituentInfo").html($("#constituentInfoForm").html());
      }
      else {
        $("#constituentInfo").html("");
      }
      break;

    case 'mailingDifferent': 
      if (document.getElementById("mailingDifferentYes").checked) {
        $("#mailingAddress").html($("#mailingAddressForm").html());
      }
      else {
        $("#mailingAddress").html("");
      }
      break;

    case 'a5Category1':
      if (document.getElementById(element).checked) {
        $("#a5Category1Toggle").html($("#a5Category1Form").html());
        validateCheckboxes('#a5ReasonChecks', 'a5Reason1');
      }
      else {
        $("#a5Category1Toggle").html("");
      }
      break;

    case 'a5Category2':
      if (document.getElementById(element).checked) {
        $("#a5Category2Toggle").html($("#a5Category2Form").html());
      }
      else {
        $("#a5Category2Toggle").html("");
      }
      break;

    case 'c1GradingPermit': 
      if (document.getElementById("c1GradingPermitYes").checked) {
        $("#c1GradingPermitToggle").html($("#c1GradingPermitForm").html());
        c1GradingPermitForm = true;
        $("#c1InstallerToggle").html("");
        c1InstallerForm = false;
      }
      else {
        $("#c1GradingPermitToggle").html("");
        c1GradingPermitForm = false;
        $("#c1InstallerToggle").html($("#c1InstallerForm").html());
        c1InstallerForm = true;
      }
      break;

    case 'c1GPPlans': 
    case 'c1SWMReport': 
      if (document.getElementById("c1SWMReportNo").checked ||
        (document.getElementById("c1GPPlansNo").checked)) {
        $("#c1InstallerToggle").html($("#c1InstallerForm").html());
        c1InstallerForm = true;
      }
      else {
        $("#c1InstallerToggle").html("");
        c1InstallerForm = false;
      }
      break;

    case 'c1InstallerPlans': 
      if (document.getElementById("c1InstallerPlansNo").checked) {
        $("#c1TreatmentDescriptionToggle").html($("#c1TreatmentDescriptionForm").html());
        c1TreatmentDescriptionForm = true;
      }
      else {
        $("#c1TreatmentDescriptionToggle").html("");
        c1TreatmentDescriptionForm = false;
      }
      break;

    case 'c1IMAgreement': 
      if (document.getElementById("c1IMAgreementYes").checked) {
        $("#c1FeeAgreementToggle").html("");
        c1FeeAgreementForm = false;
      }
      else {
        $("#c1FeeAgreementToggle").html($("#c1FeeAgreementForm").html());
        c1FeeAgreementForm = true;
      }
      break;
  }
}


/**
 * Compares the values of two elements and sets a custom validity message
 * in the browser if the values are duplicates. 
 * @param {string} id The calling element's id
 * @param {string} compareId The element to be compared against
 * 
 * @todo Replace awkward concatenation syntax with getElementById
 */
function validateDuplicates(id, compareId) {
  console.log($("#" + id).val(), $("#" + compareId).val());
  if ($("#" + id).val() == $("#" + compareId).val()) {
    console.log('duplicates = true')
    document.getElementById(id).setCustomValidity("Property classification cannot be the same.");
  }
  else {
    console.log("duplicates = false")
    document.getElementById(id).setCustomValidity("");
  }
}


/**
 * Event listener for the #backButton in #navigation.
 * Shows / hides divs depending on what is currently on screen.
 */
$("#backButton").click(function() {
  if ($(".typeSelect").is(":visible")) {
    $("#navigation, #appeal, #credit").hide();
    $("#applicationSelect").show();      
  }
  else if ($("#formContainer").is(":visible")) {
    $("#" + selected[0]).show();  
    // $("#typeSelect").show();      
    $("#formContainer").hide();      
  }
  else {
    console.log("Back button error, refreshing page")
    window.location.reload(); //default
  }
});


/**
 * Shows / hides #appeal or #credit divs depending on value 
 * of parameter. Resets selected[], form fields, navigation checkboxes, 
 * and any common divs with appended html markup.
 * @param {string} applicationType Either credit or appeal, to be saved in selected[0]
 */
function showApplicationTypes(applicationType) {
  selected.length = 0; //reset selected array
  document.getElementById('appeal').reset(); //reset appeal checkboxes
  document.getElementById('wprfApplication').reset(); //reset form fields
  $(".constituentInfo").html(""); //reset constituent / mailing divs within form

  selected.push(applicationType); 

  //show application
  $("#" + selected[0]).show();
  $("#navigation").show();
  $("#applicationSelect").hide();

  console.log(JSON.stringify(selected));  //TODO: temporary
}


/**
 * Called on either button click in #credit div.
 * Replaces HTML markup of uncommon divs and #uncommonMiddle 
 * with HTML markup of selected credit type. Saves selection to selected[1].
 * @param {string} creditType Id of selected button
 */
function showCreditApplication(creditType) {
  selected.length = 1; //truncate array
  $(".uncommon").html(""); //reset uncomon divs
  $("#formHeader").html($("#creditHeader").html()); //set credit header
  $("#statement").html($("#creditAuthorization").html()); //set credit acknowledgement

  //replace #uncommonMiddle with corresponding credit div
  switch (creditType) {
    case "creditType1":
      $("#uncommonMiddle").html($("#credit1Form").html());
      selected.push(creditType);
      break;
    case "creditType2":
      $("#uncommonMiddle").html($("#credit2Form").html());
      validateCheckboxes('#c2Checks', 'c2Documentation1');
      selected.push(creditType);
      break;
    default:
      console.log("Error appending credit type divs.");
  }   

  $("#credit").hide(); //hide credit select  
  $("#formContainer").show(); //show form

  console.log(JSON.stringify(selected)); //TODO: temporary
}


/**
 * Called on #continueButton click in #appeal div. 
 * Replaces HTML markup of uncommon divs and #uncommonMiddle with HTML markup 
 * of selected appeal type(s). Accomodates multiple selections, saves to selected[1-5].
 * 
 * @todo clean up chekcbox validation, does #appeal need to be a form?
 * @todo cleaner way to validate iniital checks in appeal5 - acces by name insyead of class? input[name="a5Category"
 */
function showAppealApplication() {
  if (validateCheckboxes("#appeal", 'appealType1') == false)
    ($("#appeal")[0].reportValidity());
  else {
    ($('#appeal')[0].checkValidity())
    console.log('validation success');

    selected.length = 1; //truncate array
    $(".uncommon").html(""); //reset uncomon divs
    $("#formHeader").html($("#appealHeader").html()); //set appeal header
    $("#statement").html($("#appealAcknowledgement").html()); //set appeal acknowledgement

    //populate selected[] with appeal selections
    populateSelectedAppealTypes();
    
    //loop thru selected[] and append appeal markup to #uncommonMiddle
    for (var i = 1; i < selected.length; i++) {
      console.log("Appending matching appeal types");
      switch (selected[i]) {
        case "appealType1":
          $("#uncommonMiddle").append($("#appeal1Form").html());
          break;
        case "appealType2":
          $("#uncommonMiddle").append($("#appeal2Form").html());
          break;
        case "appealType3":
          $("#uncommonMiddle").append($("#appeal3Form").html());
          break;
        case "appealType4":
          $("#uncommonMiddle").append($("#appeal4Form").html());
          validateCheckboxes('#a4Checks', 'a4Category1'); //force initial validation of appended divs w/ehecks
          break;
        case "appealType5":
          $("#uncommonMiddle").append($("#appeal5Form").html());
          validateCheckboxes('#a5Checks .a5Initial', 'a5Category1'); //force initial validation of appended divs w/checks
        break;
        default:
          console.log("Error appending appeal type divs.");
      }   
    }
    console.log("Show appeal application"); //TODO temporary
    $("#appeal").hide(); //hide appeal select  
    $("#formContainer").show(); //show form

    console.log(JSON.stringify(selected)); //TODO temporary
  }
}


/**
 * Validate that checked checkboxes within an element is > 0 and
 * sets a custom validity message on the browser.
 * @param {object} element The element to be validated 
 * @param {string} id The id of the input element where validation will be set
 * @returns true if checked > 0 //TODO eventually unnecessary
 * 
 * @todo can the validity be applied to the div or does it have to be an input element?
 * @todo how to access checkboxes by name and not div id?
 * @todo remove bool return, change logic in {@link showAppealApplication}
 */
function validateCheckboxes(element, id) {
  // Reference the checked checkboxes of the element
  var numChecked = $(element + " input[type=checkbox]:checked").length;
  var numBoxes = $(element + " input[type=checkbox]").length;

  console.log($(element + " input[type=checkbox]")); //TODO temporary
  console.log("\t" + numChecked + " checkboxes are checked out of " + numBoxes); //TODO temporary

  if (numChecked > 0) { //is valid
    console.log('\tpass: ' + id); //TODO temporary
    document.getElementById(id).setCustomValidity(""); //will pass validation on submit
    return true; //TODO: eventually unnecessary
  } 
  else { //is invalid
    console.log('\tfail: ' + id); //TODO temporary
    document.getElementById(id).setCustomValidity("Please select at least one of these options."); //will not pass validation on submit
    return false; //TODO eventually unnecessary
  }
}


/**
 * Populate the selected[] with checked appeal options in #appeal div
 */
function populateSelectedAppealTypes() {
  //create a local array of appeal ids
  let appealCheckbox = document.querySelectorAll('input[name="appealType"]'); 
  let appealOptions = [];
  appealCheckbox.forEach((checkbox) => {
    appealOptions.push(checkbox.id); 
  });

  //if checked, add to selected array
  for (var i = 0; i < appealOptions.length; i++) {
    if (document.getElementById(appealOptions[i]).checked) {
      console.log("\tChecked: " + appealOptions[i]);
      selected.push(appealOptions[i]);
    }
  } 
}


/**
 * Copied from pia form
 * @Desc: Handle file upload
 */
Array.prototype.forEach.call(document.querySelectorAll('.file-upload-btn'), (button) => {
  const hiddenInput = button.parentElement.querySelector('.file-upload-input');
  const label = button.parentElement.querySelector('.file-upload-label');
  const defaultLabelText = 'No files chosen';
  label.textContent = defaultLabelText;
  label.title = defaultLabelText;

  button.addEventListener('click', () => {
    hiddenInput.click();
  });
  hiddenInput.addEventListener('change', () => {
    fileUploads = [];
    let fileNameList = '';
    fileNameList = Array.prototype.map.call(hiddenInput.files, (file) => {
      fileUploads.push(file);
      return file.name;
    });

    base64Ready();
    label.textContent = fileNameList.join(', ') || defaultLabelText;
    label.title = label.textContent;
  });
});

/**
 * Copied from pia form
 * @Desc: convert to base64
 */
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Copied from pia form
 * @Desc: build base64 obj
 */
const base64Ready = () => {
  fileUploads.forEach(async (element) => {
    let getBase64 = await toBase64(element);
    let base64 = getBase64.split(',')[1];
    attachment.push({ filename: element.name, base64: base64 });
  });
};


/**
 * Handle form submit, get recaptcha token, populate common JSON data
 */
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);
  grecaptcha.ready(() => {
    console.log("execute grecaptcha token");
    grecaptcha
      .execute('6LcZ7_8UAAAAAM3vtVvjvtizev-EFEZfug9jirUa', {
        action: 'submit',
      })
      .then((token) => {
        console.log("populate JSON data");
        jsonData.token = token;
        // jsonData.token = "override"; //replace with grecaptcha
        jsonData.ownerFirstName = $('#ownerFirstName').val();
        jsonData.ownerLastName = $('#ownerLastName').val();
        jsonData.ownerCompanyName = $('#ownerCompanyName').val();
        jsonData.ownerTaxAccounts = $('#ownerTaxAccounts').val();
        jsonData.locationHouseNumber = $('#locationHouseNumber').val();
        jsonData.locationStreetName = $('#locationStreetName').val();
        jsonData.locationStreetType = $('#locationStreetType').val();
        jsonData.locationCity = $('#locationCity').val();
        jsonData.locationState = $('#locationState').val();
        jsonData.locationZip = $('#locationZip').val();
        jsonData.constituentDifferent = $('input[name="constituentDifferent"]:checked').val(); //yes or no
        if (jsonData.constituentDifferent == 'no') {
            jsonData.constituentFirstName = jsonData.ownerFirstName;
            jsonData.constituentLastName = jsonData.ownerLastName;
            jsonData.companyName = jsonData.ownerCompanyName; //jsonData.companyName
        }
        else if (jsonData.constituentDifferent == 'yes') {
            jsonData.constituentFirstName = $('#constituentFirstName').val();
            jsonData.constituentLastName = $('#constituentLastName').val();
            jsonData.companyName = $('#constituentCompanyName').val();
        }
        jsonData.constituentPhone = $('#constituentPhone').val();
        jsonData.email = $('#email').val();
        jsonData.mailingDifferent = $('input[name="mailingDifferent"]:checked').val(); //yes or no
        if (jsonData.mailingDifferent == 'no') {
            jsonData.constituentHouseNumber = jsonData.locationHouseNumber;
            jsonData.constituentStreetName = jsonData.locationStreetName;
            jsonData.constituentStreetType = jsonData.locationStreetType;
            jsonData.constituentCity = jsonData.locationCity;
            jsonData.constituentState = jsonData.locationState;
            jsonData.constituentZip = jsonData.locationZip;
          }  
        else if (jsonData.mailingDifferent == 'yes') {
            jsonData.constituentHouseNumber = $('#constituentHouseNumber').val();
            jsonData.constituentStreetName = $('#constituentStreetName').val();
            jsonData.constituentStreetType = $('#constituentStreetType').val();
            jsonData.constituentCity = $('#constituentCity').val();
            jsonData.constituentState = $('#constituentState').val();
            jsonData.constituentZip = $('#constituentZip').val();
          }
        jsonData.applicationType = selected[0];

        //populate uncommon selections from array
        for (var i = 1; i < selected.length; i++)
          populateUncommonJson(selected[i]);

        jsonData.supportingDocuments = attachment; // refer to file mgmt function
        if (jsonData.applicationType == 'appeal')
          jsonData.statementAppeal = $('input[name="statementAppeal"]:checked').val();
        else if (jsonData.applicationType == 'credit')
          jsonData.statementCredit = $('input[name="statementCredit"]:checked').val();
        
        //jsonData.signature = ''; 
        jsonData.signaturePrinted = $('#signaturePrinted').val();
        jsonData.signatureTitle = $('#signatureTitle').val();
        jsonData.signatureCompanyName = $('#signatureCompanyName').val();

        console.log('Post object', JSON.stringify(cmObject));
        postToIssueFlow();
      });
    });
});


/**
 * Populate uncommon JSON data based on values stored in selected[].
 * @param {string} element The id of the selected element
 * 
 * @todo change json variables with multiple options to concat strings or nested objects? instead of arrays[]?
 */
function populateUncommonJson(element) {
  switch (element) {
    case 'appealType1':
      jsonData.appealType1 = $('#appealType1').val();
      jsonData.a1TierCurrent = $('#a1TierCurrent').val();
      jsonData.a1TierProposed = $('#a1TierProposed').val();
      jsonData.a1Reason = $('#a1Reason').val();
      jsonData.a1Comments = $('#a1Comments').val();
      break;
    
    case 'appealType2':
      jsonData.appealType2 = $('#appealType2').val();
      jsonData.a2TypeCurrent = $('#a2TypeCurrent').val();
      jsonData.a2TypeProposed = $('#a2TypeProposed').val();
      jsonData.a2Comments = $('#a2Comments').val();
      break;

    case 'appealType3':
      jsonData.appealType3 = $('#appealType3').val();
      jsonData.a3HOAHouses = $('#a3HOAHouses').val();
      jsonData.a3HOAFee = $('#a3HOAFee').val();
      jsonData.a3Comments = $('#a3Comments').val();
      break;

    case 'appealType4':
      jsonData.appealType4 = $('#appealType4').val();
      // TODO: use array or concatenated string? Depends on CSV need
      jsonData.a4Category = [];
      document.querySelectorAll('input[name="a4Category"]:checked').forEach((checkbox) => {
        jsonData.a4Category.push(checkbox.value);
      });
      jsonData.a4Comments = $('#a4Comments').val();
      break;
      
    case 'appealType5':
      jsonData.appealType5 = $('#appealType5').val();
      // TODO: use array or concatenated string? Depends on CSV need
      // TODO: change to a json object instead of an array / adding on a loop? syntax?
      jsonData.a5Category = [];
      document.querySelectorAll('input[name="a5Category"]:checked').forEach((checkbox) => {
        jsonData.a5Category.push(checkbox.value);
      });
      if (document.getElementById("a5Category1").checked) {
        jsonData.a5Category1Reasons = [];
        document.querySelectorAll('input[name="a5Reason"]:checked').forEach((checkbox) => {
          jsonData.a5Category1Reasons.push(checkbox.value);
        });
      }
      if (document.getElementById("a5Category2").checked) {
        jsonData.a5Category2NewOwner = $('#a5Category2NewOwner').val();
      }
      jsonData.a5Comments = $('#a5Comments').val();
      break;

    case 'creditType1':
      jsonData.creditType1 = $('#creditType1').val();
      jsonData.c1Description = $('#c1Description').val();
      jsonData.c1InstallDate = $('#c1InstallDate').val();
      jsonData.c1Installer = $('#c1Installer').val();
      jsonData.c1InstallerContact = $('#c1InstallerContact').val();
      jsonData.c1GradingPermit = $('input[name="c1GradingPermit"]:checked').val();
      if (c1GradingPermitForm == true) {
        jsonData.c1GPNumber = $('#c1GPNumber').val();
        jsonData.c1GPPlans = $('input[name="c1GPPlans"]:checked').val();
        jsonData.c1SWMReport = $('input[name="c1SWMReport"]:checked').val();
      }
      if (c1InstallerForm == true) {
        jsonData.c1InstallerPlans = $('input[name="c1InstallerPlans"]:checked').val();
      }
      if (c1TreatmentDescriptionForm == true) {
        jsonData.c1TreatmentDescription = $('#c1TreatmentDescription').val();
      }
      jsonData.c1IMAgreement = $('input[name="c1IMAgreement"]:checked').val();
      if (c1FeeAgreementForm = true) {
        jsonData.c1FeeCrAgreement = $('input[name="c1FeeCrAgreement"]:checked').val();
      }
      jsonData.c1Comments = $('#c1Comments').val();
      break;

    case 'creditType2':
      jsonData.creditType2 = $('#creditType2').val();          
      jsonData.c2NPDESPermitNumber = $('#c2NPDESPermitNumber').val();
      jsonData.c2RegistrationNumber = $('#c2RegistrationNumber').val();
      jsonData.c2CleanMarina = $('input[name="c2CleanMarina"]:checked').val();
      jsonData.c2Documentation = [];
      document.querySelectorAll('input[name="c2Documentation"]:checked').forEach((checkbox) => {
        jsonData.c2Documentation.push(checkbox.value);
      });
      jsonData.c2Comments = $('#c2Comments').val();
      break;

    default:
      console.log("Error populating uncommon JSON")
  }
}


/**
 * Send JSON object to issueFlow, show confirmation message.
 */
const postToIssueFlow = () => {
  let config = {
    headers: {
      Authorization: '933540812E9970aB83486CA5m06Bte126BD5Faf523F',
    },
  };
  let url = 'https://issueflowtest.aacounty.org/caseManagerDirect';
  axios
    .post(url, cmObject, config)
    .then(function (response) {
      console.log(response);
      window.scrollTo(0, 0);
      $('#navigation').hide();
      $('#formContainer').hide();
      $('#submitMessage').show();
    })
  .catch(function (error) {
    console.log({ error: error, message: 'Error posting to Case Manager' });
  });
};