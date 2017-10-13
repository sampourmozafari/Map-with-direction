// JavaScript Document
        function detectBrowser() {
            var useragent = navigator.userAgent;
            var mapdiv = document.getElementById("map");
            if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
                mapdiv.style.width = '100%';
                mapdiv.style.height = '100%';
            } else {
                mapdiv.style.width = '400px';
                mapdiv.style.height = '600px';
            }
        }
        var myLatLng;
        var latit;
        var longit;
        function geoSuccess(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            myLatLng = {
                lat: latitude,
                lng: longitude
            };
            var mapProp = {
                zoom: 15,
                mapTypeId: 'roadmap',
            };
            var map = new google.maps.Map(document.getElementById("map"), mapProp);
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            //call renderer to display directions
            directionsDisplay.setMap(map);
            var bounds = new google.maps.LatLngBounds();

            // Multiple Markers
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'My location'
            });
            var markers = [
                ['Cphbusiness Lyngby', 55.770088, 12.511919],
                ['Cphbusiness Søerne', 55.682204, 12.562590],
                ['my current location', latitude, longitude]
            ];
            // Info Window Content
            var infoWindowContent = [
                ['<div class="info_content">' +
                    '<h3>Cphbusiness Lyngby</h3>' +
                    '<p>Nørgaardsvej 30, 2800 Kongens Lyngby</p>' +
                    '</div>'
                ],
                ['<div class="info_content">' +
                    '<h3>Cphbusiness Søerne</h3>' +
                    '<p>Nansensgade 19, 1366 København K</p>' +
                    '</div>'
                ]
               
            ];
            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(),
                marker, i;
            // Loop through our array of markers & place each one on the map
            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0]
                });
                // Allow each marker to have an info window
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent(infoWindowContent[i][0]);
                        infoWindow.open(map, marker);
                        latit = marker.getPosition().lat();
                        longit = marker.getPosition().lng();
                    }
                })(marker, i));
                marker.addListener('click', function() {
                    directionsService.route({
                        origin: myLatLng,
                        destination: {
                            lat: latit,
                            lng: longit
                        },
                        travelMode: 'DRIVING'
                    }, function(response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                });
                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);
            }
        }

        function geoError() {
            alert("Geocoder failed.");
        }
        function initMap() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(geoSuccess, geoError);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }