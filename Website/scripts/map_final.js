//Setting up variables used in functions
var click = "";
var click_clusters = "";
var hover = "";
var hover_clusters = "";
var clickedMSOAId = null;
var hoveredMSOAID = null;
var barchartdata = "";
var clickedMSOACode = "";
var i = "";


// Read in MSOA data and check that it worked
const msoas = './data/gdf_prevantable_deaths.geojson'
console.log(msoas);

// Read clusters data and check that it worked
const clusters = './data/gdf_cluster7.geojson'
console.log(clusters);

//Show/hide close button based on if MSOA is selected or not.
function ToggleCLoseButton() {
  //if an MSOA has been clicked:
  if (click.length > 0 || click_clusters.length > 0) {
    document.getElementById('clear_selection').style.display = 'block';
  //If an MSOA is not clicked
  } else {
    document.getElementById('clear_selection').style.display = 'none';
  }
};

// Set up function that shows clicked msoa
function ShowClickedMSOA() {
//if an MSOA has been clicked:
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
    //if an MSOA Cluster has been clicked
  } else if (click_clusters.length > 0) {
    map.removeFeatureState({
      source: "Clusters",
      id: clickedMSOAId
    });
    clickedMSOAId = click_clusters[0].id;
    map.setFeatureState({
      source: 'Clusters',
      id: clickedMSOAId,
    }, {
      clicked: true
    });
    //If nothing is selected:
  } else {
    map.setFeatureState({
      source: 'MSOAs',
      id: clickedMSOAId,
    }, {
      clicked: false
    });
    map.setFeatureState({
      source: 'Clusters',
      id: clickedMSOAId,
    }, {
      clicked: false
    });
    clickedMSOAId = null;
  }
};

//Set up function that shows name of clicked MSOA
function ShowClickedMSOAName() {
  //If pd msoa has been clicked
  if (click.length > 0) {
    document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click[0].properties.msoa11hclnm + '';
    //if cluster msoa has been clicked
  } else if (click_clusters.length > 0) {
    document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click_clusters[0].properties.msoa11hclnm + '';
  } else {
    document.getElementById('msoa_name').innerHTML = '<strong>Click on an area to explore </strong>'
  }
};

//Update aesthetics of cluster Box
function UpdateBoxes() {
  //Update outline of all clusters:
  var cluster_box = document.getElementsByClassName('ClusterDescription');
  for (i = 0; i < cluster_box.length; i++) {
    cluster_box[i].style.border = '1px solid white';
  };
}
//Function that highlights the cluster of clicked MSOA
function getCluster() {
  if (click_clusters.length > 0) {
    UpdateBoxes();
    var cluster = click_clusters[0].properties.KMeans7 + 1; //Get the cluster number
    console.log(cluster);
    document.getElementById('Cluster' + cluster).style.border = '5px solid white';
    var cluster_div = document.getElementById('Cluster' + cluster); //Get the relevant cluster description by ID
    cluster_div.scrollIntoView({ //Scrolls to the relevant cluster
      block: 'center',
      behavior: 'smooth'
    });
  }
}

//Function that returns the death data depending on selected MSOA and draws the chart
function GetDeathData(code) {
  $.getJSON("http://dev.spatialdatacapture.org:" + 8707 + "/data/MSOACode/" + code, function(data) {
    console.log(code);
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

    // Draw the Chart
    const chart = Highcharts.chart('chart', {
      chart: {
        backgroundColor: 'rgba(255,255,255, 0.1)',
        type: 'bar',
        marginLeft: 170,
        style: {
          fontFamily: "\"Poppins\", sans-serif"
        }
      },
      title: {
        style: {
          color: '#ffff'
        },
        text: 'Preventable Causes of Death'
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
          text: 'Proportion of Recorded Preventable Deaths'
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

//Draws barchart for ENGLAND only - DEFAULT
function BarEngland() {
  barchartdata = barchartdata = [{
      y: 28.52,
      val: 27964
    }, {
      y: 25.61,
      val: 25112
    },
    {
      y: 25.35,
      val: 24864
    },
    {
      y: 7.23,
      val: 7093
    },
    {
      y: 3.06,
      val: 2998
    }, {
      y: 2.06,
      val: 2024
    },
    {
      y: 8.17,
      val: 8014
    }
  ];

  // DRAW THE CHART
  const chart = Highcharts.chart('chart', {
    chart: {
      backgroundColor: 'rgba(255,255,255, 0.1)',
      type: 'bar',
      marginLeft: 170,
      style: {
        fontFamily: "\"Poppins\", sans-serif"
      }
    },
    title: {
      style: {
        color: '#ffff'
      },
      text: 'Preventable Causes of Death'
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
        text: 'Proportion of Recorded Preventable Deaths'
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

  //Get slider value
  var slider = document.getElementById('slider');
  var sliderValue = document.getElementById('slider-value');

  // Load the MSOA geojson data
  map.addSource('MSOAs', {
    'type': 'geojson',
    'data': msoas,
    'generateId': true
  });

  // Load the clusters geojson data
  map.addSource('Clusters', {
    'type': 'geojson',
    'data': clusters,
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
        '#B70109'
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
          ['boolean', ['feature-state', 'clicked'], false], 2, 0 //Thickness will be 2 if clicked, otherwise invisible
        ],
        //
        // zoom is 10 (or greater) -> line will be visible
        8, ['case', ['boolean', ['feature-state', 'clicked'], false], 2, 0.2] //Change size based on clicked state
      ]
    }
  });

  map.addLayer({
    'id': 'allclusters',
    'type': 'fill',
    'source': 'Clusters',
    'layout': {
      // Make layer visible by default
      'visibility': 'none'
    },
    'paint': {
      // Cluster numbers are 0-4 - 0 is cluster 1, 1 is cluster 2, etc.
      'fill-color': ['match',
        ['get', 'KMeans7'],
        0, '#D47500',
        1, '#009FD4',
        2, '#B381B3',
        3, '#00AA55',
        4, '#AA0000',
        5, '#939393',
        6, '#A74165',
        /*other*/
        '#ffffff'
      ],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'clicked'], false], 1, [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.75
        ]
      ]
    }
  });


  map.addLayer({
    'id': 'clusters-borders',
    'type': 'line',
    'source': 'Clusters',
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

  slider.addEventListener('input', function(e) {
    // Adjust the layers opacity. layer here is arbitrary - this could
    // be another layer name found in your style or a custom layer
    // added on the fly using `addSource`.
    map.setPaintProperty(
      'msoa',
      'fill-opacity',
      parseInt(e.target.value, 10) / 100
    );

    map.setPaintProperty(
      'allclusters',
      'fill-opacity',
      parseInt(e.target.value, 10) / 100
    );

    // Value indicator
    sliderValue.textContent = e.target.value + '%';
  });

  //-----------------Interactivity Functions -----------------------

  //Change opacity when hovering over MSOA
  function HoverColour() {
    if (hover.length > 0) {
      if (hoveredMSOAID !== null) {
        map.setFeatureState({
          source: 'MSOAs',
          id: hoveredMSOAID
        }, {
          hover: false
        });
      }
      hoveredMSOAID = hover[0].id;
      map.setFeatureState({
        source: 'MSOAs',
        id: hoveredMSOAID
      }, {
        hover: true
      });
    } else if (hover_clusters.length > 0) {
      if (hoveredMSOAID !== null) {
        map.setFeatureState({
          source: 'Clusters',
          id: hoveredMSOAID
        }, {
          hover: false
        });
      }
      hoveredMSOAID = hover_clusters[0].id;
      map.setFeatureState({
        source: 'Clusters',
        id: hoveredMSOAID
      }, {
        hover: true
      });
    }
  };

//Display Name of Hovered MSOA
  function HoverName() {
    if (hover.length > 0) {
      if (click.length == 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + hover[0].properties.msoa11hclnm + '';
      } else if (click.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click[0].properties.msoa11hclnm + ''
      }
    } else if (hover_clusters.length > 0) {
      if (click_clusters.length == 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + hover_clusters[0].properties.msoa11hclnm + '';
      } else if (click_clusters.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click_clusters[0].properties.msoa11hclnm + ''
      }
    } else if (hover.length == 0) {
      if (click.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click[0].properties.msoa11hclnm + ''
      } else if (click_clusters.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click_clusters[0].properties.msoa11hclnm + ''
      } else {
        document.getElementById('msoa_name').innerHTML = '<strong>Click on an area to explore </strong>'
      }
    } else if (hover_clusters.length == 0) {
      if (click_clusters.length > 0) {

        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click_clusters[0].properties.msoa11hclnm + ''
      } else {
        document.getElementById('msoa_name').innerHTML = '<strong>Click on an area to explore </strong>'
      }
    }
  }

  // Interactivity based on mouse events
  map.on('click', function(e) {
    click = map.queryRenderedFeatures(e.point, {
      layers: ['msoa']
    });
    click_clusters = map.queryRenderedFeatures(e.point, {
      layers: ['allclusters']
    });
    ShowClickedMSOAName();
    ShowClickedMSOA();
    ToggleCLoseButton();
    UpdateBoxes();
    getCluster();
    if (click.length > 0) {
      clickedMSOACode = click[0].properties.MSOA_code;
      GetDeathData(clickedMSOACode);
    } else {
      clickedMSOACode = ""
      BarEngland();
    };

  });

  //hover effects
  map.on('mousemove', function(e) {
    map.getCanvas().style.cursor = 'pointer'; //Display cursor as pointer when hovering over map
    hover = map.queryRenderedFeatures(e.point, {
      layers: ['msoa']
    });
    hover_clusters = map.queryRenderedFeatures(e.point, {
      layers: ['allclusters']
    });
    HoverColour();
    HoverName();
  });

  // When the mouse leaves the MSOA layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', ['msoa', 'allclusters'], function() {
    map.getCanvas().style.cursor = '';
    if (hoveredMSOAID !== null) {
      map.setFeatureState({
        source: 'MSOAs',
        id: hoveredMSOAID
      }, {
        hover: false
      });
      map.setFeatureState({
        source: 'Clusters',
        id: hoveredMSOAID
      }, {
        hover: false
      });
    }
    hoveredMSOAID = null;
  });
});

// Change visibility of layer depending on radio button toggle
function DisplayLayer() {
  $('#Deaths').click(function() {
    if ($(this).is(':checked')) {
      // Hide the clusters layer (if it's not already hidden)
      map.setLayoutProperty('allclusters', 'visibility', 'none');
      map.setLayoutProperty('clusters-borders', 'visibility', 'none');
      // Show the deaths layer
      map.setLayoutProperty('msoa', 'visibility', 'visible');
      map.setLayoutProperty('msoa-borders', 'visibility', 'visible');
      //Draw the england barchart
      BarEngland();
      $('#legend').show(); //Shows the legend
      $('.slider').show(); //Show the slider
    }
    //Reset variables
    click = "";
    click_clusters = "";
    close_button();
    ShowClickedMSOAName();
    ShowClickedMSOA();

  });
  $('#Clusters').click(function() {
    if ($(this).is(':checked')) {
      //Hide deaths layer
      map.setLayoutProperty('msoa', 'visibility', 'none');
      map.setLayoutProperty('msoa-borders', 'visibility', 'none')
      $('#legend').hide();
      //Show the culsters layer
      map.setLayoutProperty('allclusters', 'visibility', 'visible');
      map.setLayoutProperty('clusters-borders', 'visibility', 'visible');
      $('.slider').show(); //Show the slider
    }
    //Reset variables
    click = "";
    click_clusters = "";
    close_button();
    ShowClickedMSOAName();
    ShowClickedMSOA();
  });
};
DisplayLayer();

//Set MSOA name to empty if clear_selection button is clicked
function clear_selection() {
  click = ""; //Set click variables to empty so they have no length
  click_clusters = "";
};

function close_button() {
  clear_selection();
  ToggleCLoseButton();
  ShowClickedMSOA();
  ShowClickedMSOAName();
  BarEngland();
  UpdateBoxes();
};

//Zoom out to extent when the clear_selection button is pressed
function zoomout() {
  map.flyTo({
    center: [-0.840388033475420, 52.920856159299575],
    zoom: 5.2
  })
};

//Add event listeners for when clear selection button is clicked
document.getElementById("clear_selection").addEventListener("click", close_button);
document.getElementById("clear_selection").addEventListener("click", zoomout);
