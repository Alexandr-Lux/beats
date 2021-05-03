let myMap;
const init = () => {
	myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 12,
		controls: []
	});

	const coords = [
		[55.717859, 37.617513],
		[55.792856, 37.666096],
		[55.765083, 37.555106],
		[55.767956, 37.701973],
		[55.759956, 37.621973],
	];

	const myCollection = new ymaps.GeoObjectCollection({}, {
		draggable: false,
		iconLayout: 'default#image',
		iconImageHref: './images/icons/marker.svg',
		iconImageSize: [58, 73],
		iconImageOffset: [-29, -73]
		});

		coords.forEach(coord => {
		myCollection.add(new ymaps.Placemark(coord));
		})
		
		myMap.geoObjects.add(myCollection);

		myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);



