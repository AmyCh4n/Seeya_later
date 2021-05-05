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
                categories: ['iPhone', 'Fujifilm', 'Nikon','Canon'],
                labels:{style:{color:'#ffff'}}
            },
            yAxis: {
                title: {
                  style:{color:'#ffff'},
                    text: 'Photos taken'
                },
                labels:{style:{color:'#ffff'}}
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4,3]
            }, {
                name: 'John',
                data: [5, 7, 3,5]
            }]
        });
      });
