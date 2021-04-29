
$('input[type="radio"]').click(function() {
  if ($(this).is(':checked')) {
    var inputValue = $(this).attr("value");
    console.log(inputValue);
    var targetBox = $("." + inputValue);
    $(targetBox).show();
    $("#msoa_name").show();
    $(".box").not(targetBox).hide();
  }
});
