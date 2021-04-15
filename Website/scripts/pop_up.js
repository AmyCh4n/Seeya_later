
$('input[type="radio"]').click(function() {
  if ($(this).is(':checked')) {
    var inputValue = $(this).attr("value");
    var targetBox = $("." + inputValue);
    $(targetBox).show();
    $(".box").not(targetBox).hide();
  }
});
