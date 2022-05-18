// Claire Dupree

const form = document.getElementById('form');
const jsonData = {}; //json submit object
//case manager object
const cmObject = {
  caseTypeUUID: '6d788088-0501-4db3-82b2-9a72bf61820f',
  jsonData: jsonData,
};
//let duplicates = false;


function validateDuplicates(id, compareId) {
  console.log($("#" + id).val(), $("#" + compareId).val());
  if ($("#" + id).val() == $("#" + compareId).val()) {
    //duplicates = true;
    console.log('duplicates = true')
    document.getElementById(id).setCustomValidity("Property classification cannot be the same.");
    console.log(document.getElementById(id).validity);
  }
  else {
    console.log("duplicates = false")
    document.getElementById(id).setCustomValidity("");
  }
}

// let variable1, variable2;

// function validateDuplicates(id, value) {
//   console.log(id, value);
//   if (id == "a1TierCurrent" || id == "a2TypeCurrent"){
//     variable1 = value;
//   }
//   else {
//     variable2 = value;
//   }

//   if (variable1 == variable2) {
//     //setCustomValidity("Error! Values cant be same.");
//     alert("Error! Cant be same");
//   }
//   console.log(variable1, variable2)
// }


//how or when to validate the dropdown selections
// to make sure there arent duplicates?

// PRINT ALL SELECTED DROPDOWNS

// COMPARE ALL DROPDOWN VALUES


// // TESTING PREVENTING DUPLICATE DROPDOWNS
// function duplicates() {
//   if ($('#a1TierCurrent').val() == $('#a1TierProposed').val()) {
//     console.log('duplicates true')
//     return true;
//   }
//   else {
//     console.log('duplicates false')
//     return false;
//   }
// }

// TODO format comments to match jsdoc
// @Desc: Handle Form Submit
form.addEventListener('submit', (event) => {
    event.preventDefault(); //preventing page refresh?
    console.log(event);

  // if (duplicates == true) {
  //   return;
  // }
  // else {
      jsonData.appealType1 = $('#appealType1').val();
      jsonData.a1TierCurrent = $('#a1TierCurrent').val();
      jsonData.a1TierProposed = $('#a1TierProposed').val();
      jsonData.a1Reason = $('#a1Reason').val();
      jsonData.a1Comments = $('#a1Comments').val();
    console.log('Post object', JSON.stringify(cmObject));
  // }
});
