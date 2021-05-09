

document.addEventListener('DOMContentLoaded', function () {
        const chart = Highcharts.chart('chart', {
            chart: {
				backgroundColor: 'rgba(0,0,0,0)',
                type: 'bar'
            },
            title: {
				style:{color:'#ffff'},
                text: 'Causes of Death'
            },
            xAxis: {
              style:{color:'#ffff'},
                categories: ['Lung Cancer', 'Ischaemic Heart Disease', 'Chronic Respiratory Illness','Cerebrovascular Disease','Oesophageal Cancer','Accidental Injuries', 'Other'],
                labels:{style:{color:'#ffff'}}
            },
            yAxis: {
                title: {
                  style:{color:'#ffff'},
                    text: 'Portion of Recorded Preventable Deaths'
                },
                labels:{style:{color:'#ffff'}}
            },
            series: [{
                showInLegend: false,
                data: [1, 0, 4,3,4,5,2,1]
            }]
        });
      });




      else {
      barchartdata = [{
          y: 28.52,
          val: 29690
        }, {
          y: 25.61,
          val: 26668
        },
        {
          y: 25.44,
          val: 26484
        },
        {
          y: 7.18,
          val: 7480
        },
        {
          y: 3.13,
          val: 3259
        }, {
          y: 2.04,
          val: 2119
        },
        {
          y: 8.08,
          val: 8411
        }
      ]
    };
