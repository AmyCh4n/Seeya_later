
mapboxgl.accessToken = 'pk.eyJ1IjoiemNmdHNzdyIsImEiOiJja212c24wdW4wNmsxMm9tdG5udzVsMjd4In0.HB4Oh1U4CqgR4psD72awjQ';
var map = new mapboxgl.Map({
  container: 'mapbox', // container id
  style: 'mapbox://styles/zcftssw/cknagpjwh3dm617qxeokn7amw', // style URL
  center: [-2, 50], // starting position [lng, lat]
  zoom: 5.8 // starting zoom
});
//Adding a hoveredStateId
var hoveredStateId = null;
// Add zoom and rotation controls to the map.
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
    'layout': {},
    'paint': {
      'fill-color': '#F27405', // orange color fill
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0.5 //Change opacity based on hover state
      ]
    }
  });
  map.addLayer({
    'id': 'outline',
    'type': 'line',
    'source': 'MSOAs',
    'layout': {},
    'paint': {
      'line-color': '#ffecbd',
      'line-width': 0.5
    }
  });

  //Change colour on hover
  map.on('mousemove', 'msoa', function(e) {
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

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', 'msoas', function() {
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
