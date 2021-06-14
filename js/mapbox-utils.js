mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/satellite-streets-v11',
	center: [-98.2911, 29.5480],
	zoom: 13
});
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
}

function getLngLat(){
	map.on("click", function(event) {
		let lngLat = [event.lngLat.lat, event.lngLat.lng];
		});
}
