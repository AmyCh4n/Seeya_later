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

        var lines = data.split('\n').map(function(item) {
    return parseFloat(item);
});
var lengthlines=lines.length;
        data = lines.slice(1,lengthlines);
        console.log(data);

Highcharts.chart('sAgeChart', {
    title: {
        text: 'Distribution of People by Age'
    },
    xAxis: [{
        title: { text: '' },
        opposite: false
    }, {
        title: { text: 'Age Ratio' },
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
        data: data,
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
        data: data,
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
        data: data,
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
        data: data,
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
        text: 'Distribution of Households Below 60% of the Median Income'
    },
    xAxis: [{
        title: { text: ""  },
        opposite:true,
    }, { title: { text: 'Households Below 60% of the Median Income Ratio' },
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

        var lines = data.split('\n').map(function(item) {
    return parseFloat(item);
});
var lengthlines=lines.length;
        data = lines.slice(1,lengthlines);
        console.log(data);

Highcharts.chart('sEthnicityChart', {
    title: {
        text: 'Distribution of People by Ethnicity'
    },
    xAxis: [{
        title: { text: '' },
        opposite: false
    }, {
        title: { text: 'Ethnicity Ratio' },
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
        data: data,
        id: 's1',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Indian',
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
        data: data,
        id: 's2',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Pakistani',
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
        data: data,
        id: 's3',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Bangladeshi',
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
        data: data,
        id: 's4',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Chinese',
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
        data: data,
        id: 's4',
        marker: {
            radius: 1.5
        }
    },{
        name: 'Black',
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
        data: data,
        id: 's4',
        marker: {
            radius: 1.5
        }
    }]
});
})
