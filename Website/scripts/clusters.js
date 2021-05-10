mapboxgl.accessToken = 'pk.eyJ1IjoiemNmdHNzdyIsImEiOiJja212c24wdW4wNmsxMm9tdG5udzVsMjd4In0.HB4Oh1U4CqgR4psD72awjQ';

// Set bounds to UK
var bounds = [
[-15.996088,45.763929],// Southwest coordinates
[12.480474,62.012030]// Northeast coordinates
];
//-1.434713, 52.622569


var map = new mapboxgl.Map({
  container: 'mapbox', // container id
  style: 'mapbox://styles/zcftssw/cknagpjwh3dm617qxeokn7amw', // style URL
  center: [-0.840388033475420,52.920856159299575], // starting position [lng, lat]
  zoom: 5.2, // starting zoom
  minZoom: 4.5, // min zoom
  maxBounds: bounds
});


//Adding a hoveredStateId
var hoveredStateId = null;
//Adding a selected MSOA id
var clickedMSOAId = null;
//Adding a selcted MSOA msoa_name
var clickedMSOAname = "";
var clickedMSOACode = "";
var click = "";

// Store cluster names as list
    var clusterNames = ['On the margin', 'Less ethnically diverse national portrait',
                        'Sprinkles of death, deprivation and ethnicity', 'Slightly older and less risky',
                        'Young and multicultural metropolitans', 'Prosperous and ethnically uniform suburban enclaves',
						'Scattered pockets of life and prosperity'];
						
	var cluster0 = ['On the margin'];


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


// Read clusters
const clusters = './data/gdf_cluster7.geojson'
console.log(clusters);

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
      source: "Clusters",
      id: clickedMSOAId
    });
    clickedMSOAId = click[0].id;
    map.setFeatureState({
      source: 'Clusters',
      id: clickedMSOAId,
    }, {
      clicked: true
    });
  } else {
    map.setFeatureState({
      source: 'Clusters',
      id: clickedMSOAId,
    }, {
      clicked: false
    });
    clickedMSOAId = null;
  }
};

function ShowClickedMSOAName() {
  if (click.length > 0) {
    document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click[0].properties.msoa11hclnm + '';
  } else {
    document.getElementById('msoa_name').innerHTML = '<strong>Select an area </strong>'
  }
};

// Set up function that shows clicked cluster
function ShowClickedClusterName() {
  if (click.length >= 0) {
    document.getElementById('clusterNumber').innerHTML = '<strong>Cluster: </strong>' + click[0].properties.KMeans7 + '';
  } else {
    document.getElementById('clusterNumber').innerHTML = '<strong>Select a Cluster </strong>'
  }
};



// When map loads...
map.on('load', function() {

    // Load the clusters geojson data
    map.addSource('Clusters', {
        'type': 'geojson',
        'data': clusters,
        'generateId': true
    });

    // Add MSOA polygons
    map.addLayer({
        'id': 'allclusters',
        'type': 'fill',
        'source': 'Clusters',
        'layout': {
          // Make layer visible by default
          'visibility': 'none'},
        'paint': {
          // Cluster numbers are 0-4 - 0 is cluster 1, 1 is cluster 2, etc.
          'fill-color':
          ['match',
          ['get', 'KMeans7'],
          0,'#40e0d0',
		  1, '#fa8072',
		  2, '#daa520',
		  3, '#2e8b57',
		  4, '#f4a460',
		  5, '#d8bfd8',
		  6, '#a9a9a9',
		  /*other*/ '#ffffff'
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



  //---------------------------------------------Interactivity Functions ----------------------------------------------------------------


  // Set up function that changes color of msoa on hover
  function HoverColour(a) {
    var hover = map.queryRenderedFeatures(a.point, {
      layers: ['allclusters']
    });
    if (hover.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState({
          source: 'Clusters',
          id: hoveredStateId
        }, {
          hover: false
        });
      }
      hoveredStateId = hover[0].id;
      map.setFeatureState({
        source: 'Clusters',
        id: hoveredStateId
      }, {
        hover: true
      });
    }
  };


  //Display name on hover
  function HoverName(a) {
    var msoa_hover = map.queryRenderedFeatures(a.point, {
      layers: ['allclusters']
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
        document.getElementById('msoa_name').innerHTML = '<strong>Select an area </strong>'
      }
    }
  };
  

//-------------------------------------------Calling interactivity based on mouse events-----------------------------------------------

  // Listen for click on map and carry out click functions
  map.on('click', function(e) {
    click = map.queryRenderedFeatures(e.point, {
      layers: ['allclusters']
    });
    ShowClickedMSOAName();
    ShowClickedMSOA(e);
	ShowClickedClusterName(e);
    ToggleCLoseButton();
    clickedMSOACode = click[0].properties.MSOA_code;
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
  map.on('mouseleave', 'Clusters', function() {
    map.getCanvas().style.cursor = '';
    if (hoveredStateId !== null) {
      map.setFeatureState({
        source: 'Clusters',
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
  $('#Clusters').click(function() {
    if ($(this).is(':checked')) {
	//Show the culsters layer
      map.setLayoutProperty('allclusters', 'visibility', 'visible');
      map.setLayoutProperty('clusters-borders', 'visibility', 'visible')
      $('#legend').hide();
      
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
  ShowClickedClusterName();
};

document.getElementById("clear_selection").addEventListener("click", close_button);





