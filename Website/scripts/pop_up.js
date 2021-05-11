//Once map has loaded, make radio buttons clickable to avoid map layer not being loaded on time
map.on('load', function() {
  $('#Deaths').removeAttr('disabled');
  $('#Clusters').removeAttr('disabled');});

$(document).ready(function(){
$('input[type="radio"]').click(function() {
  if ($(this).is(':checked')) {
    var inputValue = $(this).attr("value");
    console.log(inputValue);
    var targetBox = $("." + inputValue);
    $(targetBox).show();
    $("#msoa_display").show();
    $(".box").not(targetBox).hide();
  }
});


//- MODAL POP-UP FOR MORE INFO
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("info");

// Get the <span> element that closes the modal
var span = document.getElementById("close_info");

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


})
