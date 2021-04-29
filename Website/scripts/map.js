mapboxgl.accessToken = 'pk.eyJ1IjoiemNmdHNzdyIsImEiOiJja212c24wdW4wNmsxMm9tdG5udzVsMjd4In0.HB4Oh1U4CqgR4psD72awjQ';
var map = new mapboxgl.Map({
  container: 'mapbox', // container id
  style: 'mapbox://styles/zcftssw/cknagpjwh3dm617qxeokn7amw', // style URL
  center: [-1.434713, 52.622569], // starting position [lng, lat]
  zoom: 5.4, // starting zoom
  minZoom: 4.5 // min zoom
});
//Adding a hoveredStateId
var hoveredStateId = null;
//Adding a selected MSOA id
var clickedMSOAId = null;
//Adding a selcted MSOA msoa_name
var clickedMSOAname = null;
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

  //Change colour on hover
  map.on('mousemove', 'msoa', function(e) {
    map.getCanvas().style.cursor = 'pointer';
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState({
          source: 'MSOAs',
          id: hoveredStateId
        }, {
          hover: false
        });
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState({
        source: 'MSOAs',
        id: hoveredStateId
      }, {
        hover: true
      });
    }
  });

  // When the mouse leaves the MSOA layer, update the feature state of the
  // previously hovered feature.
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

  // Display the name of the MSOA on website

  map.on('mousemove', function(e) {
    var msoa_hover = map.queryRenderedFeatures(e.point, {
      layers: ['msoa']
    });
    if ((clickedMSOAname === null || clickedMSOAname.length === 0) && msoa_hover.length > 0) {
      document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + msoa_hover[0].properties.msoa11hclnm + '';
    } else if (clickedMSOAname.length > 0) {
      document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + clickedMSOAname[0].properties.msoa11hclnm + ''
    } else {
      document.getElementById('msoa_name').innerHTML = '<strong>Select an area </strong>'
    }
    $('#msoa_name').quickfit();
  });

  // Display name of clicked MSOA
  map.on('click', function(e) {
    clickedMSOAname = map.queryRenderedFeatures(e.point, {
      layers: ['msoa']
    });

    if (clickedMSOAname.length > 0) {
      document.getElementById('msoa_name').innerHTML = '<strong>MSOA: </strong>' + clickedMSOAname[0].properties.msoa11hclnm + '';
    } else {
      document.getElementById('msoa_name').innerHTML = '<strong>Select an area </strong>';
    }
    console.log(clickedMSOAname.length);
  });

  map.on('click', function(e) {
    var click = map.queryRenderedFeatures(e.point, {
      layers: ['msoa']
    });

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
    } else {
      map.setLayoutProperty('msoas', 'visibility', 'none');
    }
  });
  $('#Clusters').click(function() {
    if ($(this).is(':checked')) {
      //Hide deaths layer
      map.setLayoutProperty('msoa', 'visibility', 'none');
      map.setLayoutProperty('msoa-borders', 'visibility', 'none')
      //Show the culsters layer
    }
  });
};
DisplayLayer();
