/**
  * The app variable initializes ths application with the Clarifai Javascript SDK
*/
var app = new Clarifai.App(CLIENT_ID, CLIENT_SECRET);

/**
  * INPUT: An image file
  * OUTPUT: A Base64-encoded image string
  ---
  * This function adds a new method
  * It allows us to convert a file to Base64
  * It also strips some metadata at the start of the encoded string so Clarifai will accept it
  * We will use this later to convert the file selected by the user
*/
File.prototype.convertToBase64 = function(callback) {
  var reader = new FileReader();
  reader.onload = function(response) {
    base64 = response.target.result.replace(/^data:image\/(.*);base64,/, '');
    callback(base64);
  };
  reader.onerror = function(err) { callback(err); };
  reader.readAsDataURL(this);
};

/**
  * This function removed all state classes
  * It then adds the state class which it's passed as an argument
*/
function stateClass(classToAdd) {
  $("#" + FORM_ID + " ." + FILE_CLASS).removeClass("working approved rejected");
  $("#" + FORM_ID + " ." + FILE_CLASS).addClass(classToAdd);
}

/**
  * INPUT: A Base64-encoded image string
  * OUTPUT: A boolean to show whether the image is SFW
  ---
  * This function calls the Clarifai API, specifically the NSFW model
  * It takes the Base64-encoded image and makes the request
  * When the request is made, we add the 'working' class to the input
  * It then takes the result, finds the SFW value and compares it against the user-specificed threshold
  * It returns a true/false value and then runs passResponse()
*/
function validateFileInputs(image) {
  stateClass("working");
  app.models.predict(Clarifai.NSFW_MODEL, {base64: image}).then(
    function(response) {
      var pass; 
      data = JSON.parse(response.request.response);
      concepts = data.outputs[0].data.concepts;
      $.each(concepts, function(k, v) {
        if(v.name == "sfw") {
          pass = v.value > SFW_LOWER_LIMIT;
        }
      });
      parseResponse(pass);
    },
    function(err) { console.log(err); }
  )
};

/**
  * INPUT: A boolean value
  * OUTPUT: Visual feedback on form input
  ---
  * This function takes the result of checking whether the image is SFW 
  * It then calls stateClass, which removes all state classes and adds the one it is passed.
*/
function parseResponse(pass) {
  if(pass === true) {
    stateClass("approved");
    clarifaiCheckPass();
  } else {
    stateClass("rejected");
    clarifaiCheckFail();
  }
}

$(document).ready(function() {
  /**
    * This runs the application every time the form input is changed 
  */
  $("#" + FORM_ID + " ." + FILE_CLASS).on('change',function(){
    var selectedFile = this.files[0];
    selectedFile.convertToBase64(function(base64){
      validateFileInputs(base64);
    });
  });

  /**
    * This stops the form submitting until the file input image has been approved
  */
  $("#" + FORM_ID + " input[type=submit]").click(function(e) {
    e.preventDefault();
    if($("#" + FORM_ID + " ." + FILE_CLASS).hasClass("approved")) {
      console.log("clicked");
      $(this).unbind('click').submit();
    }
  });
});