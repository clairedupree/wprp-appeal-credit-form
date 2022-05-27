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
  
//TODO: should this be a queryselectorall? make a class called uncommonToggle
// is it more readable as an onchange function?
function toggleDivs(id) {
  switch(id) {
    case 'a5Category1':
      if (document.getElementById(id).checked) {
        $("#a5Category1Toggle").html($("#a5Category1Form").html());
        $("#a5Category1Span").html('because it is (select all that apply): <span class="requiredField">*</span> ');
      }
      else {
        $("#a5Category1Toggle").html("");
        $("#a5Category1Span").html("");
      }
      break;

    case 'a5Category2':
      if (document.getElementById(id).checked) {
        $("#a5Category2Toggle").html($("#a5Category2Form").html());
      }
      else {
        $("#a5Category2Toggle").html("");
      }
      break;

    // validate every time
    case 'mailingDifferentYes':
    case 'mailingDifferentNo':
      if (document.getElementById("mailingDifferentYes").checked) {
        $("#mailingAddress").html($("#mailingAddressForm").html());
      }
      else {
        $("#mailingAddress").html("");
      }
      break;

    // validate every time
    case 'constituentDifferentYes':
    case 'constituentDifferentNo':
        if (document.getElementById("constituentDifferentYes").checked) {
        $("#constituentInfo").html($("#constituentInfoForm").html());
      }
      else {
        $("#constituentInfo").html("");
      }
      break;
  }
}

// function a5Category1Toggle() {
//   if (document.getElementById("a5Category1").checked) {
//     console.log("toggle category1");
//     $("#a5Category1Toggle").html($("#a5Category1Form").html());
//     $("#a5Category1Span").html('because it is (select all that apply): <span class="requiredField">*</span> ');
//   }
//   else {
//     $("#a5Category1Toggle").html("");
//     $("#a5Category1Span").html("");
//   }
// }

// function a5Category2Toggle() {
//   if (document.getElementById("a5Category2").checked) {
//     console.log("toggle category2");
//     $("#a5Category2Toggle").html($("#a5Category2Form").html());
//   }
//   else {
//     $("#a5Category2Toggle").html("");
//   }
// }

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

// TODO: combine utility functions into a single function uncommonToggle(){}
// const representative = document.getElementsByName("constituentIsOwner");
// representative.addEventListener('change', (event) => {
// });
// function mailingAddressToggle() {
//   if (document.getElementById("mailingDifferentYes").checked) {
//     console.log('yes');
//     // TODO: this doesnt reset when form is reset
//     // TODO: add .uncommon class to the div
//     $("#mailingAddress").html($("#mailingAddressForm").html());
//   }
//   else {
//     console.log('no');
//     $("#mailingAddress").html("");
//   }
// }

// combine utility functions later
// function constituentInfoToggle() {
//   if (document.getElementById("constituentDifferentYes").checked) {
//     console.log('yes');
//     $("#constituentInfo").html($("#constituentInfoForm").html());
//   }
//   else {
//     console.log('no');
//     $("#constituentInfo").html("");
//   }
// }

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
  // reset applicant info
  $(".constituentInfo").html(""); 

  //add choice to array
  selected.push(applicationType);
  //TEMPORARY
  $("#showError").html("You selected: " + selected);

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
  // TODO: rewrite this so the validation is added on change
  // todo: then force-validate on button click
  // TODO: make the validate function create an error, let that error stop from proceeding
  if (validateCheckboxes("#appeal", 'continueButton') == false)
    $("#showError").html("Please select at least one appeal type.");
    // $('#continueButton')[0].reportValidity();

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
//@param The element to be checked .name or #name (can be used for other form checkboxes)
function validateCheckboxes(element, id) {
  // Reference the checked checkboxes of the element
  var numChecked = $(element + " input[type=checkbox]:checked").length;
  console.log("\t" + numChecked + " checkboxes are checked");

  if (numChecked > 0) {
    document.getElementById(id).setCustomValidity("");
    return true; //eventually unnecessary
  } 
  else {
    document.getElementById(id).setCustomValidity("Please select at least one.");
    return false; //eventually unnecessary
  }
}


// Populate array selection data in the selected array
function populateSelectedAppealTypes() {
  // Create a local array of appeal ids
  let appealCheckbox = document.querySelectorAll('input[name="appealType"]'); 
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
  event.preventDefault();
  console.log(event);
  // TODO: add grecaptcha
  // grecaptcha.ready(() => {
  //   console.log("execute grecaptcha token");
  //   grecaptcha
  //     .execute('6LcZ7_8UAAAAAM3vtVvjvtizev-EFEZfug9jirUa', {
  //       action: 'submit',
  //     })
  //     .then((token) => {
  //       console.log("populate JSON data");
  //       jsonData.token = token;
        jsonData.token = "override"; //replace with grecaptcha
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
          // TODO: send i as argument, use for documenting the appeal applications
          // i.e. ("appealType" + i) if needed for cleaner json

        jsonData.supportingDocuments = attachment; // refer to file mgmt function
        if (jsonData.applicationType == 'appeal')
          jsonData.statementAppeal = $('input[name="statementAppeal"]:checked').val();
        else if (jsonData.applicationType == 'credit')
          jsonData.statementCredit = $('input[name="statementCredit"]:checked').val();
        
        //jsonData.signature = ''; 
        jsonData.signaturePrinted = $('#signaturePrinted').val();
        jsonData.signatureTitle = $('#signatureTitle').val();
        jsonData.signatureCompanyName = $('#signatureCompanyName').val();

        // postToIssueFlow();
      // });
    // });
  console.log('Post object', JSON.stringify(cmObject));
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
      // TODO: change to append (make a4Category a string instead of array), if needed for CSV export formatting
      // TODO: OR / use this method for all the appeal selections as well?
      jsonData.a4Categories = [];
      document.querySelectorAll('input[name="a4Category"]:checked').forEach((checkbox) => {
        jsonData.a4Categories.push(checkbox.value);
      });
      jsonData.a4Comments = $('#a4Comments').val();
      break;
      
    case 'appealType5':
      jsonData.appealType5 = $('#appealType5').val();
      jsonData.a5Categories = [];
      document.querySelectorAll('input[name="a5Category"]:checked').forEach((checkbox) => {
        jsonData.a5Categories.push(checkbox.value);
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


// BORROWED FROM PIA FORM:
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