/*collapsible menu*/
var coll = document.getElementsByClassName("collapsible");
var i;

for(i=0; i<coll.length; i++){
  coll[i].addEventListener("click",function(){
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block"){
      content.style.display = "none";
    } else{
      content.style.display = "block";
    }
  });
}

/*Preventable Deaths*/
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/deaths.csv', function (data) {

        var lines = data.split('\n').map(function(item) {
    return parseFloat(item);
});
var lengthlines=lines.length;
        data = lines.slice(1,lengthlines);
        console.log(data);

Highcharts.chart('spdChart',{
    title: {
        text: 'Distribution of Preventable Deaths'
    },
    xAxis: [{
        title: { text: ""  },
        opposite:true,
    }, { title: { text: 'Mortality Ratio' },
        opposite:false,

    }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs' },
        opposite: false
    }],

    series: [{
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
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/age.csv', function (data) {
        var lines = data.replace(/\n/g, ",").split(",").map(function(item) {
    return parseFloat(item);
});

var lengthlines=lines.length;
        data = lines.slice(4,lengthlines);

var data1 = data.filter(function(value, index, Arr) {
    return index % 4 == 0;
});
console.log(data1);

var data2 = data.filter(function(value, index, Arr) {
    return index % 4 == 1;
});
console.log(data2);

var data3 = data.filter(function(value, index, Arr) {
    return index % 4 == 2;
});
console.log(data3);

var data4 = data.filter(function(value, index, Arr) {
    return index % 4 == 3;
});
console.log(data4);

Highcharts.chart('sAgeChart', {
    title: {
        text: 'Distribution of People by Age'
    },
    xAxis: [{
        title: { text: '' },
        opposite: false
    }, {
        title: { text: 'Percentage of Population' },
        opposite: false
    }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs' },
        opposite: false
    }],

    series: [{
        name: '0-15',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: 0
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
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/IMD2019.csv', function (data) {

        var lines = data.split('\n').map(function(item) {
    return parseFloat(item);
});
var lengthlines=lines.length;
        data = lines.slice(1,lengthlines);
        console.log(data);

Highcharts.chart('sImdChart', {
    title: {
        text: 'Distribution of IMD Scores in 2019'
    },
    xAxis: [{
        title: { text: ""  },
        opposite:true,
    }, { title: { text: 'IMD Score 2019' },
        opposite:false,

    }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs' },
        opposite: false
    }],

    series: [{
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
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/Ethnicities.csv', function (data) {
  var lines = data.replace(/\n/g, ",").split(",").map(function(item) {
return parseFloat(item);
});

var lengthlines=lines.length;
  data = lines.slice(6,lengthlines);

var edata1 = data.filter(function(value, index, Arr) {
return index % 6 == 0;
});
console.log(edata1);

var edata2 = data.filter(function(value, index, Arr) {
return index % 6 == 1;
});
console.log(edata2);

var edata3 = data.filter(function(value, index, Arr) {
return index % 6 == 2;
});
console.log(edata3);

var edata4 = data.filter(function(value, index, Arr) {
return index % 6 == 3;
});
console.log(edata4);

Highcharts.chart('sEthnicityChart', {
    title: {
        text: 'Distribution of People by Ethnicity'
    },
    xAxis: [{
        title: { text: '' },
        opposite: false
    }, {
        title: { text: 'Percentage of Population' },
        opposite: false
    }],

    yAxis: [{
        title: { text: '' }
    }, {
        title: { text: 'Count of MSOAs' },
        opposite: false
    }],

    series: [{
        name: 'White',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: 0
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
