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
/*Reading in PD Data
var pdArray = [];

function getData(){

  const response = fetch('./data/deaths.csv');
  console.log(response);

  const data = response.text();

  const pdTable = data.split('\n').slice(1);
  pdTable.forEach(pdRow =>{
    const pdColumns = pdRow.split(',');
    var deaths = parseFloat (pdColumns[0]);
    /*console.log(deaths);
    pdArray.push(deaths);
  });
  console.log(pdArray);
  return pdArray;
};
var pdArray2 = getData();
console.log(pdArray2);*/

/*
const pdxlabels = [];
const ydeaths = [];
pdChart();
async function pdChart(){
  await getData();
  const ctx = document.getElementById('spdChart').getContext('2d');
  const pdChart = new Chart(ctx, {
      type: 'bar',
      labels: pdxlabels,
      data: {
          labels: ['Number of Preventable Deaths'],
          datasets: [{
              label: 'Count of MSOA',
              data: ydeaths,
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1
          }]
      }
  });
}*/

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;









/*Socioeconomic Indicators*/
/*Age*/
/*Reading in Age Data
getData();

async function getData(){
  const response = await fetch('./data/age.csv');
  const data = await response.text();

  const aTable = data.split('\n').slice(1);
  aTable.forEach(aRow =>{
    const aColumns = aRow.split(',');
    const age1 = aColumns[2];
    const age2 = aColumns[3];
    const age3 = aColumns[4];
    const age4 = aColumns[5];
    /*console.log(age1);
  })
}*/
/*
var ctx = document.getElementById('sAgeChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Age'],
        datasets: [{
            label: 'Count of MSOA',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

/*IMD


var ctx = document.getElementById('sImdChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['IMD Scoring'],
        datasets: [{
            label: 'Count of MSOA',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});*/

/*Ethnicity
var ctx = document.getElementById('sEthnicityChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Percentage of Population'],
        datasets: [{
            label: 'Count of MSOA',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});*/
