mapboxgl.accessToken = MAPBOX_TOKEN;

let map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/satellite-streets-v11',
	center: [-98.2911, 29.5480],
	zoom: 13
});

let marker;
mapEvent();

let geocoder = setGeocoder();
addGeocoderToMap(geocoder);


function setGeocoder(){
	return new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
		marker: true
	})
}
function addGeocoderToMap(geocoder){
	map.addControl(geocoder);

	geocoder.on('result', function(event){
		console.log(event.result.place_name);
		console.log(event);

		setMarker(event.result.geometry.coordinates);
		marker.setPopup(displayPopup(event.result.place_name));

		fetchForecast(event.result.geometry.coordinates)
	});
}

function setMarker(point){
	if(!marker){
		marker = new mapboxgl.Marker().setLngLat(point).addTo(map);
	} else {
		marker.setLngLat(point);
	}
}
function mapEvent(){
	map.on("click", function(event) {
		setMarker(event.lngLat);
		fetchForecast([event.lngLat.lng, event.lngLat.lat])
		});
}

function displayPopup(textDetails){
	return new mapboxgl.Popup().setHTML(`<p>${textDetails}</p>`).addTo(map);
}