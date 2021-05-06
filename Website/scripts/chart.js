

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
