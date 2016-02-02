if (typeof origen == 'undefined') { origen = new Object(); }
if (typeof origen.maps == 'undefined') { origen.maps = new Object(); }

/*Variaveis para markers*/
var idInfoBoxAberto;
var infoBox = [];

origen.maps = {
  inicializa: function(){
   origen.maps.init();
 },

 init: function(){
      //inicialização automatica
    },

    geraMaps: function(idMaps, zoom){
      var latlng = new google.maps.LatLng(-23.593233888817895, -46.59908083251952);

      var styles = [
      {
        featureType: "all",
        stylers: [
        {
          saturation: -100
        },
        {
          hue: "#f2f2f2"
        }
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
        {
          hue: "#99c96a" 
        },
        {
          saturation: -50
        }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
        { 
          visibility: "off"
        }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
        {
          "color": "#b3d1ff"
        },
        {
          "visibility": "on"
        }
        ]
      }
      ];
      
      var styledMap = new google.maps.StyledMapType(styles,{name: "Mapa Rocha Branca"});

      var options = {
        zoom: zoom,
        center: latlng,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };

      map = new google.maps.Map(document.getElementById(idMaps), options);

      geocoder = new google.maps.Geocoder();

      marker = new google.maps.Marker({
        map: map,
        draggable: true,
      });

      marker.setPosition(latlng);

      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
      
    },

    mostraNoMapa: function(endereco){

      geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            $('#txtEndereco').val(results[0].formatted_address);
            $('#txtLatitude').val(latitude);
            $('#txtLongitude').val(longitude);

            var location = new google.maps.LatLng(latitude, longitude);
            marker.setPosition(location);
            map.setCenter(location);
            map.setZoom(14);
          }
        }
      });
    },

    geolocalizacao: function(){
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          marker.setPosition(pos);
          map.setCenter(pos);
          map.setZoom(13); 

        }, function() {
          alternativaGeolocalizacao();
        });
      } else {
        // Browser doesn't support Geolocation
        alternativaGeolocalizacao();
      }
    },

    alternativaGeolocalizacao: function(){
      alert('Serviço de GPS desativado');
    },

    abrirInfoBox: function(id, marker) {
      if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
        infoBox[idInfoBoxAberto].close();
      }

      infoBox[id].open(map, marker);
      idInfoBoxAberto = id;
    },

    carregaPontosLojas: function(){
      $.getJSON('js/maps/lojas.json', function(pontos) {

        $.each(pontos, function(index, ponto) {

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
            title: ponto.Loja,
            map: map,
            icon: 'img/marker-lojas.gif'
          });

          /*Gerando informações mostradas na caixa quando clicado*/
          var myOptions = {
            content: "<p>Conteúdo do InfoBox</p>",
            pixelOffset: new google.maps.Size(-150, 0)
          };

          infoBox[ponto.Id] = new InfoBox(myOptions);
          infoBox[ponto.Id].marker = marker;

          infoBox[ponto.Id].listener = google.maps.event.addListener(marker, 'click', function (e) {
            origen.maps.abrirInfoBox(ponto.Id, marker);
          });

        });

      });
    }




  };

  $(document).ready(origen.maps.inicializa);