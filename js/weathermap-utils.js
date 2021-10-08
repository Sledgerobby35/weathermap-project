function fetchForecast(coordinates) {
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast",
		type: "GET",
		data: {
			APPID: OPEN_WEATHERMAP_TOKEN,
			lat: coordinates[1],
			lon: coordinates[0],
			units: "imperial",

		},
		success: function (data) {

			buildDOMObjects(filterWeatherObjects(data), filterLocation(data));
		}
	});
}

$(document).ready(function(event) {
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast",
		data: {
			APPID: OPEN_WEATHERMAP_TOKEN,
			q: "Universal City, USA",
			units: "imperial",
		},

		success: function (data){
			buildDOMObjects(filterWeatherObjects(data), filterLocation(data))
		}
	});
});

function filterWeatherObjects(data) {

	let arr = [];

	for(let i = 0; i < data.list.length; i++){

		if(i % 8 === 0){
			arr.push(data.list[i]);
		}
	}
	return arr;
}

function filterLocation(data) {

	return data.city;

}