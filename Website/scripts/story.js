/*Preventable Deaths*/
$.get('https://raw.githubusercontent.com/signesw/Seeya_later/main/Website/data/deaths.csv', function (data) {

        var lines = data.split('\n').map(function(item) {
    return parseFloat(item);
});
var lengthlines=lines.length;
        data = lines.slice(1,lengthlines);
        console.log(data);

Highcharts.chart('spdChart', {
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

        var lines = data.split('\n').map(function(aItem) {
    return parseFloat(aItem);
});
var lengthALines=lines.length;
        aData = lines.slice(1,lengthALines);
        console.log(aData);

Highcharts.chart('sAgeChart', {
    title: {
        text: 'Distribution of People by Age'
    },
    xAxis: [{
        title: { text: '' },
        opposite:true,
    }, { title: { text: 'Age Ratio' },
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
        name: 'aData',
        visible: false,
        showInLegend: false,
       // type: 'scatter',
        data: aData,
        id: 's1',
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
