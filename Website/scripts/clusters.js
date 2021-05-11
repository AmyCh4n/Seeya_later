mapboxgl.accessToken = 'pk.eyJ1IjoiemNmdHNzdyIsImEiOiJja212c24wdW4wNmsxMm9tdG5udzVsMjd4In0.HB4Oh1U4CqgR4psD72awjQ';


//Adding a hoveredStateId
var hoveredStateId_clusters = null;
var hover_clusters="";
//Adding a selected MSOA id
var clickedMSOAId_clusters = null;
//Adding a selcted MSOA msoa_name
var clickedMSOAname_clusters = "";
var clickedMSOACode_clusters = "";
var click_clusters = "";
var selectedcluster="";

// Store cluster names as list
    var clusterNames = ['On the margin', 'Less ethnically diverse national portrait',
                        'Sprinkles of death, deprivation and ethnicity', 'Slightly older and less risky',
                        'Young and multicultural metropolitans', 'Prosperous and ethnically uniform suburban enclaves',
						'Scattered pockets of life and prosperity'];

	var cluster0 = ['On the margin'];





// Read clusters
const clusters = './data/gdf_cluster7.geojson'
console.log(clusters);

//Show/hide close button based on if MSOA is selected or not.
function ToggleCLoseButton_clusters() {
  if (click_clusters.length > 0) {
    console.log("true");
    document.getElementById('clear_selection').style.display = 'block';
  } else {
    document.getElementById('clear_selection').style.display = 'none';
  }
};

// Set up function that shows clicked msoa
function ShowClickedMSOA_clusters() {

  if (click_clusters.length > 0) {
    map.removeFeatureState({
      source: "Clusters",
      id: clickedMSOAId_clusters
    });
    clickedMSOAId_clusters = click_clusters[0].id;
    map.setFeatureState({
      source: 'Clusters',
      id: clickedMSOAId_clusters,
    }, {
      clicked: true
    });
  } else {
    map.setFeatureState({
      source: 'Clusters',
      id: clickedMSOAId_clusters,
    }, {
      clicked: false
    });
    clickedMSOAId_clusters = null;
  }
};

function ShowClickedMSOAName_clusters() {
  if (click_clusters.length > 0) {
    document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click_clusters[0].properties.msoa11hclnm + '';
  } else {
    document.getElementById('msoa_name').innerHTML = '<strong>Click on an area to explore </strong>'
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






  // Set up function that changes color of msoa on hover
  function HoverColour() {
    if (hover_clusters.length > 0) {
      if (hoveredStateId_clusters !== null) {
        map.setFeatureState({
          source: 'Clusters',
          id: hoveredStateId_clusters
        }, {
          hover: false
        });
      }
      hoveredStateId_clusters = hover_clusters[0].id;
      map.setFeatureState({
        source: 'Clusters',
        id: hoveredStateId_clusters
      }, {
        hover: true
      });
    }
  };


  //Display name on hover
  function HoverName_clusters() {
    if (hover_clusters.length > 0) {
      if ((click_clusters === null || click_clusters.length === 0) && hover_clusters.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + hover_clusters[0].properties.msoa11hclnm + '';
      } else if (click_clusters.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click_clusters[0].properties.msoa11hclnm + ''
      }
    } else if (hover_clusters.length == 0) {
      if (click_clusters.length > 0) {
        document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + click_clusters[0].properties.msoa11hclnm + ''
      } else {
        document.getElementById('msoa_name').innerHTML = '<strong>Click on an area to explore </strong>'
      }
    }
  };


//-------------------------------------------Calling interactivity based on mouse events-----------------------------------------------

function Clusters_Click(){
  map.on('click', function(e) {
    console.log('cluster_click');
    click_clusters = map.queryRenderedFeatures(e.point, {
      layers: ['allclusters']
    });
    ShowClickedMSOAName_clusters();
    ShowClickedMSOA_clusters();
    ToggleCLoseButton_clusters();
    selectedcluster=click_clusters[0].properties.KMeans7;
    console.log(selectedcluster);
  });
}
//Only run these functions if clusters is checked
$('input:radio[name="drone"]').change(function() {
  if ($(this).is(':checked') && $(this).val() == 'Clusters') {
    console.log('clusters_test');
    Clusters_Click();
  // Listen for click on map and carry out click functions


  //hover effects
  map.on('mousemove', function(e) {
    map.getCanvas().style.cursor = 'pointer'; //Display as pointer when hovering over map
    hover_clusters = map.queryRenderedFeatures(e.point, {
      layers: ['allclusters']
    });
    HoverColour(e);
    HoverName_clusters(e);
  });


  // When the mouse leaves the MSOA layer, update the feature state of the
  // previously hovered feature. --> Might make this a function too
  map.on('mouseleave', 'Clusters', function() {
    map.getCanvas().style.cursor = '';
    if (hoveredStateId_clusters !== null) {
      map.setFeatureState({
        source: 'Clusters',
        id: hoveredStateId_clusters
      }, {
        hover: false
      });
    }
    hoveredStateId_clusters = null;
  });

}
});

});




// Change visibility of layer depending on radio button toggle
function DisplayLayer() {
  $('#Clusters').click(function() {
    if ($(this).is(':checked')) {
	//Show the culsters layer
      map.setLayoutProperty('allclusters', 'visibility', 'visible');
      map.setLayoutProperty('clusters-borders', 'visibility', 'visible');
  //Hide the deaths layers
  map.setLayoutProperty('msoa', 'visibility', 'none');
  map.setLayoutProperty('msoa-borders', 'visibility', 'none')
      $('#legend').hide();

    }
  });
};
DisplayLayer();

//Set MSOA name to empty if clear_selection button is clicked
function clear_selection() {
  console.log('click!')
  clickedMSOAname_clusters = ""; //Set the var to empty
  click_clusters = "";
};

function close_button() {
  clear_selection();
  ToggleCLoseButton_clusters();
  ShowClickedMSOA_clusters();
  ShowClickedMSOAName_clusters();
};

document.getElementById("clear_selection").addEventListener("click", close_button);
