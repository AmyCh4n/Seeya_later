/*collapsible menu*/
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/*for(i=0; i<coll.length; i++){
  coll[i].addEventListener("click",function(){
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block"){
      content.style.display = "none";
    } else{
      content.style.display = "block";
    }
  });
}*/

/*Preventable Deaths*/
/*Read in data and process*/
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/deaths.csv', function (data) {

        var lines = data.split('\n').map(function(item) {
    return parseFloat(item);
});
var lengthlines=lines.length;
        data = lines.slice(1,lengthlines);

/*Draw graph*/
const pdchart = Highcharts.chart('spdChart',{
  chart: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    type: 'histogram',
    style: {
      fontFamily: "\"Poppins\", sans-serif"
    }
  },
    title: {
      style: {
        color: '#ffff'
      },
      text: 'Distribution of Preventable Deaths'
    },
    xAxis: [{
        title: { text: ""  },
        opposite:true,
    }, { title: { text: 'Mortality Ratio',
        style:{
          color: '#ffff',
        }},
        opposite:false,
        labels: {
          style: {
            color: '#ffff',
          }
        },
      }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs',
        style: {
          color: '#ffff'
        },
      },
        opposite: false,
        labels: {
          style: {
            color: '#ffff',
          }
        },
    }],

    plotOptions:{
      series:{
        color: '#D47500'
      }
    },

    tooltip: {
      pointFormat:  `<span style="font-size:10px">{point.x:.2f} - {point.x2:.2f}
                    </span><br/>
                    <span style="color:{point.color}">\u25CF</span>
                    {series.name} <b>{point.y}</b><br/>`
    },

    series: [{
    borderColor: '#ffff',
    showInLegend:false,
        name: 'Count of MSOAs',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: 0,
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: data,
        id: 's1',
        marker: {
            radius: 1.5
        }

    }]
});
})

/*Age*/
/*Read in data and process*/
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/age.csv', function (data) {
        var lines = data.replace(/\n/g, ",").split(",").map(function(item) {
    return parseFloat(item);
});

/*Make arrays*/
var lengthlines=lines.length;
        data = lines.slice(4,lengthlines);

var data1 = data.filter(function(value, index, Arr) {
    return index % 4 == 0;
});

var data2 = data.filter(function(value, index, Arr) {
    return index % 4 == 1;
});

var data3 = data.filter(function(value, index, Arr) {
    return index % 4 == 2;
});

var data4 = data.filter(function(value, index, Arr) {
    return index % 4 == 3;
});

/*Draw graph*/
const achart = Highcharts.chart('sAgeChart', {
    chart: {
      backgroundColor: 'rgba(255,255,255, 0.1)',
      type: 'histogram',
      style: {
        fontFamily: "\"Poppins\", sans-serif"
      }
    },
    legend:{
      itemStyle:{
        color: '#ffff'
      }
    },
    title: {
      style: {
        color: '#ffff'
      },
      text: 'Distribution of People by Age'
    },
    xAxis: [{
        title: { text: '' },
        opposite: false
    }, {
        title: { text: 'Percentage of Population in MSOA (%)',
        style:{
          color: '#ffff',
        }},
        opposite:false,
        labels: {
          style: {
            color: '#ffff',
          }
        },
    }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs',
        style: {
          color: '#ffff'
        },
      },
        opposite: false,
        labels: {
          style: {
            color: '#ffff',
          }
        },
    }],

    plotOptions: {
        series: {
            borderColor: '#ffff',
        }
    },

    tooltip: {
      pointFormat:  `<span style="font-size:10px">{point.x:.2f} - {point.x2:.2f}
                    </span><br/>
                    <span style="color:{point.color}">\u25CF</span>
                    {series.name} <b>{point.y}</b><br/>`
    },

    series: [{
        name: '0-15',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: 0,
        color: '#00AA55'
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: data1,
        id: 's1',
        marker: {
            radius: 1.5
        }
    },{
        name: '16-24',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's2',
        zIndex: 0
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: data2,
        id: 's2',
        marker: {
            radius: 1.5
        }
    },{
        name: '25-64',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's3',
        zIndex: 0
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: data3,
        id: 's3',
        marker: {
            radius: 1.5
        }
    },{
        name: '64+',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's4',
        zIndex: 0
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: data4,
        id: 's4',
        marker: {
            radius: 1.5
        }
    }]
});
})

/*IMD 2019*/
/*Read in data and process*/
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/IMD2019.csv', function (data) {

        var lines = data.split('\n').map(function(item) {
    return parseFloat(item);
});
var lengthlines=lines.length;
        data = lines.slice(1,lengthlines);

/*Draw graph*/
const imdchart =Highcharts.chart('sImdChart', {
    chart: {
      backgroundColor: 'rgba(255,255,255, 0.1)',
      type: 'histogram',
      style: {
        fontFamily: "\"Poppins\", sans-serif"
      }
    },
    title: {
      style: {
        color: '#ffff'
      },
      text: 'Distribution of IMD Scores in 2019'
    },
    xAxis: [{
        title: { text: ""  },
        opposite:true,
    }, { title: { text: 'IMD Score 2019',
        style:{
          color: '#ffff',
        }},
        opposite:false,
        labels: {
          style: {
            color: '#ffff',
          }
    },
    }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs',
        style: {
          color: '#ffff'
        },
      },
        opposite: false,
        labels: {
          style: {
            color: '#ffff',
          }
        },
    }],

    plotOptions:{
      series:{
        color: '#D47500'
      }
    },

    tooltip: {
      pointFormat:  `<span style="font-size:10px">{point.x:.2f} - {point.x2:.2f}
                    </span><br/>
                    <span style="color:{point.color}">\u25CF</span>
                    {series.name} <b>{point.y}</b><br/>`
    },

    series: [{
    borderColor: '#ffff',
    showInLegend:false,
        name: 'Count of MSOAs',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: 0,

    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: data,
        id: 's1',
        marker: {
            radius: 1.5
        }

    }]
});
})

/*Ethnicity*/
/*Read in data and process*/
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/Ethnicities.csv', function (data) {
  var lines = data.replace(/\n/g, ",").split(",").map(function(item) {
return parseFloat(item);
});

/*Make arrays*/
var lengthlines=lines.length;
  data = lines.slice(4,lengthlines);

var edata1 = data.filter(function(value, index, Arr) {
return index % 4 == 0;
});


var edata2 = data.filter(function(value, index, Arr) {
return index % 4 == 1;
});

var edata3 = data.filter(function(value, index, Arr) {
return index % 4 == 2;
});

var edata4 = data.filter(function(value, index, Arr) {
return index % 4 == 3;
});

 /*Draw graph*/
const ethchart =Highcharts.chart('sEthnicityChart', {
    chart: {
      backgroundColor: 'rgba(255,255,255, 0.1)',
      type: 'histogram',
      style: {
        fontFamily: "\"Poppins\", sans-serif"
      }
    },
    legend:{
      itemStyle:{
        color: '#ffff'
      }
    },
    title: {
      style: {
        color: '#ffff'
      },
      text: 'Distribution of People by Ethnicity'
    },
    xAxis: [{
        title: { text: '' },
        opposite: false
    }, {
        title: { text: 'Percentage of Population in MSOA (%)',
        style:{
          color: '#ffff',
        }},
        opposite:false,
        labels: {
          style: {
            color: '#ffff',
          }
       },
    }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs',
        style: {
          color: '#ffff'
        },
      },
        opposite: false,
        labels: {
          style: {
            color: '#ffff',
          }
        },
    }],

    plotOptions: {
        series: {
            borderColor: '#ffff',
            labels:{
              style:{
                color:'#ffff',
              }
            }
        }
    },

    tooltip: {
      pointFormat:  `<span style="font-size:10px">{point.x:.2f} - {point.x2:.2f}
                    </span><br/>
                    <span style="color:{point.color}">\u25CF</span>
                    {series.name} <b>{point.y}</b><br/>`
    },

    series: [{
        name: 'White',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: 0,
        color: '#009FD4'
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: edata1,
        id: 's1',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Black',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's2',
        zIndex: 0
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: edata2,
        id: 's2',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Chinese',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's3',
        zIndex: 0
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: edata3,
        id: 's3',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Subcont',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's4',
        zIndex: 0
    }, {
        name: 'Data',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: edata4,
        id: 's4',
        marker: {
            radius: 1.5
        }
    }]
});
})
