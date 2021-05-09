//Adding a hoveredStateId
var hoveredStateId = null;
//Adding a selected MSOA id
var clickedMSOAId = null;
//Adding a selcted MSOA msoa_name
var clickedMSOAname = "";
var clickedMSOACode = "";
var click = "";
var barchartdata ="";


// Add zoom controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// Add a search bar to the map
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: 'gb' //Limit search to GB
  }), 'top-left'
);

// Read in MSOA data and check that it worked
const msoas = './data/gdf_prevantable_deaths.geojson'
console.log(msoas);

//Show/hide close button based on if MSOA is selected or not.
function ToggleCLoseButton() {
  if (click.length > 0) {
    console.log("true");
    document.getElementById('clear_selection').style.display = 'block';
  } else {
    document.getElementById('clear_selection').style.display = 'none';
  }
};

// Set up function that shows clicked msoa
function ShowClickedMSOA() {

  if (click.length > 0) {
    map.removeFeatureState({
      source: "MSOAs",
      id: clickedMSOAId
    });
    clickedMSOAId = click[0].id;
    map.setFeatureState({
      source: 'MSOAs',
      id: clickedMSOAId,
    }, {
      clicked: true
    });
  } else {
    map.setFeatureState({
      source: 'MSOAs',
      id: clickedMSOAId,
    }, {
      clicked: false
    });
    clickedMSOAId = null;
  }
};

//Set up function that shows name of clicked MSOA
function ShowClickedMSOAName() {
  if (click.length > 0) {
    document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click[0].properties.msoa11hclnm + '';
  } else {
    document.getElementById('msoa_name').innerHTML = '<strong>Click on an area to explore </strong>'
  }
};

//Function that returns the death data depending on selected MSOA and draws the chart
function GetDeathData(code) {
    $.getJSON("http://dev.spatialdatacapture.org:" + 8707 + "/data/MSOACode/" + code, function(data) {
      //Get list of counts from data returned by API
      barchartdata = [{
          y: data[0].lung_prop,
          val: data[0].lung_count
        }, {
          y: data[0].heart_prop,
          val: data[0].heart_count
        },
        {
          y: data[0].respiratory_prop,
          val: data[0].respiratory_count
        },
        {
          y: data[0].cerebrovascular_prop,
          val: data[0].cerebrovascular_count
        },
        {
          y: data[0].oesophageal_prop,
          val: data[0].oesophageal_count
        }, {
          y: data[0].accident_prop,
          val: data[0].accident_count
        },
        {
          y: data[0].other_prop,
          val: data[0].other_count
        }
      ];

      // DRAW THE CHART
      const chart = Highcharts.chart('chart', {
        chart: {
          backgroundColor: 'rgba(255,255,255, 0.1)',
          type: 'bar',
          marginLeft:170,
          style: {
            fontFamily: "\"Poppins\", sans-serif"
          }
        },
        title: {
          style: {
            color: '#ffff'
          },
          text: 'Causes of Death'
        },
        subtitle: {
          style: {
            color: '#ffff'
          },
          text: click[0].properties.msoa11hclnm
        },
        xAxis: {
          style: {
            color: '#ffff'
          },
          categories: ['Lung Cancer', 'Ischaemic Heart Disease', 'Chronic Respiratory \n Illness', 'Cerebrovascular Disease', 'Oesophageal Cancer', 'Accidental Injuries', 'Other'],
          labels: {
            align: 'right',
            style: {
              color: '#ffff',
              wordBreak: 'break-all'
            }
          }
        },
        yAxis: {
          title: {
            style: {
              color: '#ffff'
            },
            text: 'Portion of Recorded Preventable Deaths'
          },
          labels: {
            formatter: function() {
              return (this.isLast ? this.value + '%' : this.value);
            },
            style: {
              color: '#ffff'
            },

          },
          tickPositions: [0, 20, 40, 60, 80, 100]
        },
        series: [{
          name: 'Count of Preventable Deaths',
          showInLegend: false,
          data: barchartdata,
          color: '#F27405',
        }],
        tooltip: {
          formatter: function() {
            return 'Count of deaths: ' + this.point.val;
          }
        }
      });


    });
};

//Draws barchart for ENGLAND
function BarEngland(){
  barchartdata = barchartdata = [{
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
  ];

  // DRAW THE CHART
  const chart = Highcharts.chart('chart', {
    chart: {
      backgroundColor: 'rgba(255,255,255, 0.1)',
      type: 'bar',
      marginLeft:170,
      style: {
        fontFamily: "\"Poppins\", sans-serif"
      }
    },
    title: {
      style: {
        color: '#ffff'
      },
      text: 'Causes of Death'
    },
    subtitle: {
      style: {
        color: '#ffff'
      },
      text: "England"
    },
    xAxis: {
      style: {
        color: '#ffff'
      },
      categories: ['Lung Cancer', 'Ischaemic Heart Disease', 'Chronic Respiratory \n Illness', 'Cerebrovascular Disease', 'Oesophageal Cancer', 'Accidental Injuries', 'Other'],
      labels: {
        align: 'right',
        style: {
          color: '#ffff',
          wordBreak: 'break-all'
        }
      }
    },
    yAxis: {
      title: {
        style: {
          color: '#ffff'
        },
        text: 'Portion of Recorded Preventable Deaths'
      },
      labels: {
        formatter: function() {
          return (this.isLast ? this.value + '%' : this.value);
        },
        style: {
          color: '#ffff'
        },

      },
      tickPositions: [0, 20, 40, 60, 80, 100]
    },
    series: [{
      name: 'Count of Preventable Deaths',
      showInLegend: false,
      data: barchartdata,
      color: '#F27405',
    }],
    tooltip: {
      formatter: function() {
        return 'Count of deaths: ' + this.point.val;
      }
    },
  });

};

// When map loads...
map.on('load', function() {
  // Load the MSOA geojson data
  map.addSource('MSOAs', {
    'type': 'geojson',
    'data': msoas,
    'generateId': true
  });

  // visualize MSOA polygon.
  map.addLayer({
    'id': 'msoa',
    'type': 'fill',
    'source': 'MSOAs', // reference the data source
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'preventable_deaths'], 25.90,
        '#F6DE7F',
        71.50,
        '#F29F05',
        86.10,
        '#F27405',
        104.70,
        '#F24405',
        132.20,
        '#F20505'
      ], // orange color fill
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'clicked'], false], 1, [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.75 //Change opacity based on hover state
        ]
      ]
    }
  });

  map.addLayer({
    'id': 'msoa-borders',
    'type': 'line',
    'source': 'MSOAs',
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'line-color': ['case', //Change color based on clicked state
        ['boolean', ['feature-state', 'clicked'], false], '#fffee6', '#66605b'
      ],
      'line-width': [ // change visibility of border based on zoom level
        "interpolate", ["linear"],
        ["zoom"],
        // zoom is 5 (or less) -> line will be invisible
        6.4, ['case',
          ['boolean', ['feature-state', 'clicked'], false], 2, 0
        ],
        //    2,//size will be 2 if clicked,
        // zoom is 10 (or greater) -> line will be visible
        8, ['case', ['boolean', ['feature-state', 'clicked'], false], 2, 0.2] //Change size based on clicked state
      ]
    }
  });

  //---------------------------------------------Interactivity Functions ----------------------------------------------------------------




  // Set up function that changes color of msoa on hover
  function HoverColour(a) {
    var hover = map.queryRenderedFeatures(a.point, {
      layers: ['msoa']
    });
    if (hover.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState({
          source: 'MSOAs',
          id: hoveredStateId
        }, {
          hover: false
        });
      }
      hoveredStateId = hover[0].id;
      map.setFeatureState({
        source: 'MSOAs',
        id: hoveredStateId
      }, {
        hover: true
      });
    }
  };


  //Display name on hover
  function HoverName(a) {
    var msoa_hover = map.queryRenderedFeatures(a.point, {
      layers: ['msoa']
    });
    if (msoa_hover.length > 0) {
      if ((click === null || click.length === 0) && msoa_hover.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + msoa_hover[0].properties.msoa11hclnm + '';
      } else if (click.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click[0].properties.msoa11hclnm + ''
      }
    } else if (msoa_hover.length == 0) {
      if (click.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click[0].properties.msoa11hclnm + ''
      } else {
        document.getElementById('msoa_name').innerHTML = '<strong>Click on an area to explore </strong>'
      }
    }
  };
  //-------------------------------------------Calling interactivity based on mouse events-----------------------------------------------

  // Listen for click on map and carry out click functions
  map.on('click', function(e) {
    click = map.queryRenderedFeatures(e.point, {
      layers: ['msoa']
    });
    ShowClickedMSOAName();
    ShowClickedMSOA(e);
    ToggleCLoseButton();
    if (click.length > 0) {
      clickedMSOACode = click[0].properties.MSOA_code;
      GetDeathData(clickedMSOACode);
    } else {
      clickedMSOACode = ""
      BarEngland();
    };
    console.log(clickedMSOACode);
  });



  //hover effects
  map.on('mousemove', function(e) {
    map.getCanvas().style.cursor = 'pointer'; //Display as pointer when hovering over map
    HoverColour(e);
    HoverName(e);
  });


  // When the mouse leaves the MSOA layer, update the feature state of the
  // previously hovered feature. --> Might make this a function too
  map.on('mouseleave', 'msoa', function() {
    map.getCanvas().style.cursor = '';
    if (hoveredStateId !== null) {
      map.setFeatureState({
        source: 'MSOAs',
        id: hoveredStateId
      }, {
        hover: false
      });
    }
    hoveredStateId = null;
  });





});



// Change visibility of layer depending on radio button toggle
function DisplayLayer() {
  $('#Deaths').click(function() {
    if ($(this).is(':checked')) {
      // Hide the clusters layer (if it's not already hidden)

      // Show the deaths layer
      map.setLayoutProperty('msoa', 'visibility', 'visible');
      map.setLayoutProperty('msoa-borders', 'visibility', 'visible');
      //Draw the england barchart
      BarEngland();
      $('#legend').show(); //Shows the legend
    } else {
      map.setLayoutProperty('msoas', 'visibility', 'none');
    }
  });
  $('#Clusters').click(function() {
    if ($(this).is(':checked')) {
      //Hide deaths layer
      map.setLayoutProperty('msoa', 'visibility', 'none');
      map.setLayoutProperty('msoa-borders', 'visibility', 'none')
      $('#legend').hide();
      //Show the culsters layer
    }
  });
};
DisplayLayer();

//Set MSOA name to empty if clear_selection button is clicked
function clear_selection() {
  console.log('click!')
  clickedMSOAname = ""; //Set the var to empty
  click = "";
};

function close_button() {
  clear_selection();
  ToggleCLoseButton();
  ShowClickedMSOA();
  ShowClickedMSOAName();
  BarEngland();
};

document.getElementById("clear_selection").addEventListener("click", close_button);
