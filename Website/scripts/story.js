/*Drop down menu
function dropdwn(){
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event){
  if(!event.target.matches('.dropbtn')){
    var dropdowns = document.getElementByClassName("dropdown-content");
    var i;
    for (i=0; i<dropdowns.length; i++){
      var openDropdown = dropdowns[i];
      if(openDropdown.classList.contains('show')){
        openDropdown.classList.remove('show');
      }
    }
  }
}*/

/*collapsible menu
var coll = document.getElementByClassName("collapsible");
var i;

for(i=0; i<coll.length; i++){
  coll[i].addEventListener("click",function(){
    this,classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block"){
      content.style.display = "none";
    } else{
      content.style.display = "block";
    }
  });
}*/

/*Preventable Deaths*/
var chart = new Chart('spdChart', {
  type: 'horizontalBar',
  data: {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [10, 20, 30]
      }
    ]
  }
});

/*Socioeconomic Indicators*/
/*Age*/

/*IMD*/

/*Ethnicity*/
