const form = document.getElementById('wprfApplication');
let selected = []; //user selection array
const jsonData = {}; //json submit object
//case manager object
const cmObject = {
  caseTypeUUID: '6d788088-0501-4db3-82b2-9a72bf61820f',
  jsonData: jsonData,
};
let fileUploads = []; //copied from pia form
let attachment = []; //copied from pia form
  

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

// combine utility functions later
// const representative = document.getElementsByName("applicantRepresentative");
// representative.addEventListener('change', (event) => {
// });
function mailingAddressToggle() {
  if (document.getElementById("mailingDifferentYes").checked) {
    console.log('yes');
    // TODO: this doesnt reset when form is reset
    $("#mailingAddress").html($("#mailingAddressForm").html());
  }
  else {
    console.log('no');
    $("#mailingAddress").html("");
  }
}

  
// combine utility functions later
function representativeToggle() {
  if (document.getElementById("representativeYes").checked) {
    console.log('yes');
    $("#representative").html($("#representativeForm").html());
  }
  else {
    console.log('no');
    $("#representative").html("");
  }
}

// BACK BUTTON 
$("#backButton").click(function() {
  if ($("#appeal").is(":visible") || $("#credit").is(":visible")) {
    console.log("Leaving application type select")
    $("#navigation, #appeal, #credit").hide();
    $("#applicationSelect").show();      
  }
  else if ($("#formContainer").is(":visible")) {
    console.log("Leaving application")
    $("#" + selected[0]).show();  
    console.log('reset middle div');
    $("#formContainer").hide();      
  }
  else {
    console.log("Back button default - page refresh")
    window.location.reload(); //default
  }
});


// SHOW APPLICATION TYPE
function showApplicationTypes(applicationType) {
  // reset array, appeal checkboxes, form input, uncommon divs
  selected.length = 0;
  $('input[type=checkbox]').prop('checked', false);
  document.getElementById('wprfApplication').reset();
  //$(".uncommon").html("");

  //add choice to array
  selected.push(applicationType);
  $("#showError").html("You selected: " + selected); //display temp console

  //show application
  $("#" + selected[0]).show();
  //hide initial options
  $("#navigation").show();
  $("#applicationSelect").hide();

  // Print selections so far
  console.log(JSON.stringify(selected));
}


// SHOW CREDIT APPLICATION
function showCreditApplication(creditType) {
  selected.length = 1; //truncate array
  $(".uncommon").html(""); //reset uncomon divs

  $("#formHeader").html($("#creditHeader").html()); //set credit header
  $("#statement").html($("#creditAuthorization").html()); //set credit auth statement

  // set uncommon credit options
  console.log("Populate array data & append middle div");
  switch (creditType) {
    case "creditType1":
      $("#uncommonMiddle").html($("#credit1Form").html());
      selected.push(creditType);
      break;
    case "creditType2":
      $("#uncommonMiddle").html($("#credit2Form").html());
      selected.push(creditType);
      break;
    default:
      $("#showError").html("Error appending credit types");
  }   

  $("#credit").hide(); //hide credit select  
  $("#formContainer").show(); //show form

  console.log(JSON.stringify(selected));
  $("#showError").html("You selected: " + selected); //temporary
}



// SHOW APPEAL APPLICATION
function showAppealApplication() {
  console.log("Validate checkboxes");
  if (validateCheckboxes("#appeal") == false)
    $("#showError").html("Please select at least one appeal type.");

  else {
    selected.length = 1; //truncate array
    $(".uncommon").html(""); //reset uncomon divs

    $("#formHeader").html($("#appealHeader").html()); //set appeal header
    $("#statement").html($("#appealAcknowledgement").html()); //set appeal ack statement

    populateSelectedAppealTypes(); //populate selected array

    // set uncommon appeal options
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
          break;
        case "appealType5":
          $("#uncommonMiddle").append($("#appeal5Form").html());
          break;
        default:
          $("#showError").html("Error appending appeal types.");
      }   
    }

    console.log("Show appeal application");
    $("#appeal").hide(); //hide appeal select  
    $("#formContainer").show(); //show form

    console.log(JSON.stringify(selected));
    $("#showError").html("You selected: " + selected); //temporary
  }  
}


// Validate checked checkboxes is > 0
//@param The element id to be checked (can be used for other form checkboxes)
function validateCheckboxes(element) {
  // Reference the checked checkboxes of the element
  var numChecked = $(element + " input[type=checkbox]:checked").length;
  console.log("\t" + numChecked + " checkboxes are checked");

  if (numChecked > 0) {
    return true;
  } 
  else {
    return false;
  }
}


// Populate array selection data in the selected array
function populateSelectedAppealTypes() {
  // Create a local array of appeal ids
  let appealCheckbox = document.querySelectorAll('input[name="appealCheckbox"]'); 
  let appealOptions = [];
  appealCheckbox.forEach((checkbox) => {
    appealOptions.push(checkbox.id); 
  });

  // If checked, add to array
  for (var i = 0; i < appealOptions.length; i++) {
    if (document.getElementById(appealOptions[i]).checked) {
      console.log("\tChecked: " + appealOptions[i]);
      selected.push(appealOptions[i]);
    }
  } 
}

// Copied from pia form
//@Desc: Handle file upload
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

//@Desc: convert to base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

//@Desc: build base64 obj
const base64Ready = () => {
  fileUploads.forEach(async (element) => {
    let getBase64 = await toBase64(element);
    let base64 = getBase64.split(',')[1];
    attachment.push({ filename: element.name, base64: base64 });
  });
};


// TODO format comments to match jsdoc
// @Desc: Handle Form Submit
form.addEventListener('submit', (event) => {
    event.preventDefault(); //preventing page refresh?
    console.log(event);

    // TODO: reorder these so constituent is first?
    jsonData.ownerFirstName = $('#ownerFirstName').val();
    jsonData.ownerLastName = $('#ownerLastName').val();
    jsonData.ownerOrganization = $('#ownerOrganization').val();
    jsonData.ownerTaxAccounts = $('#ownerTaxAccounts').val();
    jsonData.propertyAddress1 = $('#propertyAddress1').val();
    jsonData.propertyAddress2 = $('#propertyAddress2').val();
    jsonData.propertyCity = $('#propertyCity').val();
    jsonData.propertyState = $('#propertyState').val();
    jsonData.propertyZip = $('#propertyZip').val();
    jsonData.applicantRepresentative = $('input[name="applicantRepresentative"]:checked').val(); //yes or no
    if (jsonData.applicantRepresentative == 'no') {
        jsonData.constituentFirstName = jsonData.ownerFirstName;
        jsonData.constituentLastName = jsonData.ownerLastName;
        jsonData.constituentOrganization = jsonData.ownerOrganization;
    }
    else if (jsonData.applicantRepresentative == 'yes') {
        jsonData.constituentFirstName = $('#applicantFirstName').val();
        jsonData.constituentLastName = $('#applicantLastName').val();
        jsonData.constituentOrganization = $('#applicantOrganization').val();
    }
    jsonData.constituentPhone = $('#constituentPhone').val();
    jsonData.constituentEmail = $('#constituentEmail').val();
    jsonData.mailingDifferent = $('input[name="mailingDifferent"]:checked').val(); //yes or no
    if (jsonData.mailingDifferent == 'no') {
        jsonData.constituentAddress1 = jsonData.propertyAddress1;
        jsonData.constituentAddress2 = jsonData.propertyAddress2;
        jsonData.constituentCity = jsonData.propertyCity;
        jsonData.constituentState = jsonData.propertyState;
        jsonData.constituentZip = jsonData.propertyZip;
      }  
    else if (jsonData.mailingDifferent == 'yes') {
        jsonData.constituentAddress1 = $('#constituentAddress1').val(); //mailingAddress1
        jsonData.constituentAddress2 = $('#constituentAddress2').val(); //mailingAddress2
        jsonData.constituentCity = $('#constituentCity').val();
        jsonData.constituentState = $('#constituentState').val();
        jsonData.constituentgZip = $('#constituentZip').val();
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
    jsonData.signatureOrganization = $('#signatureOrganization').val();

    console.log('Post object', JSON.stringify(cmObject));
    //postToIssueFlow();
});


//populate json based on user selection
function populateUncommonJson(element) {
  //console.log('populateUncommonJson()');

  switch (element) {
    case 'appealType1':
      jsonData.appealType1 = $('#appealType1').val();
      jsonData.a1TierCurrent = $('#a1TierCurrent').val();
      jsonData.a1TierProposed = $('#a1TierProposed').val();
      jsonData.a1Reason = $('#a1Reason').val();
      jsonData.a1Comments = $('#a1Comments').val();
      break;

    case 'creditType1':
      jsonData.creditType = $('#creditType2').val();
      jsonData.c1Description = $('#c1Description').val();
      break;

    case 'creditType2':
      jsonData.creditType = $('#creditType2').val();          
      jsonData.c2NPDESPermitNumber = $('#c2NPDESPermitNumber').val();
      jsonData.c2RegistrationNumber = $('#c2RegistrationNumber').val();
      break;

    default:
      console.log("Error populating uncommon JSON")
  }
}


// EXAMPLE FROM PIA FORM:
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
      // $('#formTitle').hide();
      // $('#piaForm').hide();
      // $('#message').show();
    })
  .catch(function (error) {
    console.log({ error: error, message: 'Error posting to Case Manager' });
  });
};