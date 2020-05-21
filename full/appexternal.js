function hslayersNgConfig(ol) {
  return {
    open_lm_after_comp_loaded: true,
    layer_order: '-position',
    box_layers: [
      new ol.layer.Group({
        'img': 'osm.png',
        title: 'Base layer',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
            title: 'OpenStreetMap',
            base: true,
            visible: true,
            removable: false
          }),
          new ol.layer.Tile({
            title: 'OpenCycleMap',
            visible: false,
            base: true,
            source: new ol.source.OSM({
              url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
            })
          }),
          new ol.layer.Tile({
            title: 'Satellite',
            visible: false,
            base: true,
            source: new ol.source.XYZ({
              url: 'http://api.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmFpdGlzYmUiLCJhIjoiY2lrNzRtbGZnMDA2bXZya3Nsb2Z4ZGZ2MiJ9.g1T5zK-bukSbJsOypONL9g'
            })
          })
        ]
      }), new ol.layer.Group({
        'img': 'armenia.png',
        title: 'WMS layers',
        layers: [
          new ol.layer.Tile({
            title: 'Swiss',
            source: new ol.source.TileWMS({
              url: 'http://wms.geo.admin.ch/',
              params: {
                LAYERS: 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
                INFO_FORMAT: undefined,
                FORMAT: 'image/png; mode=8bit'
              },
              crossOrigin: 'anonymous'
            })
          }),
          new ol.layer.Tile({
            title: 'Ilida plastics kg/ha per year',
            source: new ol.source.TileWMS({
              url: 'http://gis.lesprojekt.cz/cgi-bin/mapserv?map=/home/dima/maps/ilida/ilida.map',
              params: {
                LAYERS: 'ilida_cultivation_plastics',
                INFO_FORMAT: undefined,
                FORMAT: 'image/png',
                ABSTRACT: 'Plastic waste in Ilida municipality'
              },
              crossOrigin: 'anonymous'
            }),
            path: 'Ilida Thematic Data',
            visible: true,
            opacity: 0.8
          }),
          new ol.layer.Tile({
            title: 'Výnosový potenciál',
            source: new ol.source.TileWMS({
              url: 'http://foodie-data.wirelessinfo.cz/geoserver-hsl/kojcice/wms?',
              params: {
                LAYERS: 'kojcice_vynospot_5m_poly',
                //INFO_FORMAT: undefined,
                INFO_FORMAT: 'text/html',
                FORMAT: 'image/png'
              },
              crossOrigin: 'anonymous'
            }),
            path: 'Kojčice',
            visible: true,
            opacity: 0.5
          }),
          new ol.layer.Tile({
            title: 'Aplikační pásma dle výnosového potenciálu',
            source: new ol.source.TileWMS({
              url: 'http://foodie-data.wirelessinfo.cz/geoserver-hsl/kojcice/wms?',
              params: {
                LAYERS: 'kojcice_vra_n1_pole_viper',
                //INFO_FORMAT: undefined,
                INFO_FORMAT: 'text/html',
                FORMAT: 'image/png'
              },
              crossOrigin: 'anonymous'
            }),
            path: 'Kojčice',
            visible: true,
            opacity: 0.5
          }),
          new ol.layer.Tile({
            title: 'Půdní typ',
            source: new ol.source.TileWMS({
              url: 'http://foodie-data.wirelessinfo.cz/geoserver-hsl/kojcice/wms?',
              params: {
                LAYERS: 'pudni_typy_verze3',
                //INFO_FORMAT: undefined,
                INFO_FORMAT: 'text/html',
                FORMAT: 'image/png'
              },
              crossOrigin: 'anonymous'
            }),
            path: 'Kojčice',
            visible: true,
            opacity: 0.5
          }),
          new ol.layer.Tile({
            title: 'LPIS',
            source: new ol.source.TileWMS({
              url: 'http://foodie-data.wirelessinfo.cz/geoserver-hsl/kojcice/wms?',
              params: {
                LAYERS: 'lpis_zdkojcice',
                //INFO_FORMAT: undefined,
                INFO_FORMAT: 'text/html',
                FORMAT: 'image/png'
              },
              crossOrigin: 'anonymous'
            }),
            path: 'Kojčice',
            visible: true,
            opacity: 0.5
          })
        ]
      })
    ],
    default_view: new ol.View({
      center: ol.proj.transform([17.474129, 52.574000], 'EPSG:4326', 'EPSG:3857'), //Latitude longitude    to Spherical Mercator
      zoom: 4,
      units: 'm'
    }),
    compositions_catalogue_url: '/php/catalogue/libs/cswclient/cswClientRun.php',
    status_manager_url: '/wwwlibs/statusmanager2/index.php',
    datasources: [{
      title: 'SuperCAT',
      url: 'http://cat.ccss.cz/csw/',
      language: 'eng',
      type: 'micka',
      code_list_url: '/php/metadata/util/codelists.php?_dc=1440156028103&language=eng&page=1&start=0&limit=25&filter=%5B%7B%22property%22%3A%22label%22%7D%5D'
    }]
  };
}
