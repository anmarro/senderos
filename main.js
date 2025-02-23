require([
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/widgets/Bookmarks",
  "esri/widgets/BasemapGallery",
  "esri/widgets/LayerList",
  "esri/widgets/Legend",
  "esri/widgets/Print",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/Expand",
  "esri/widgets/Fullscreen",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/Graphic",
  "esri/widgets/ScaleBar",
  "esri/layers/FeatureLayer",
  "esri/webmap/Bookmark",
  "esri/layers/GroupLayer",
  "esri/geometry/Extent",
  "esri/Ground",
  "esri/layers/ElevationLayer",
], function (
  Map,
  MapView,
  SceneView,
  Bookmarks,
  BasemapGallery,
  LayerList,
  Legend,
  Print,
  DistanceMeasurement2D,
  Expand,
  Fullscreen,
  Home,
  Locate,
  Graphic,
  ScaleBar,
  FeatureLayer,
  Bookmark,
  GroupLayer,
  Extent,
  Ground,
  ElevationLayer
) {
  let esriElevation = new ElevationLayer({
    url: "https://tiledbasemaps.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
  });
  // Botón de cambio de vista
  const switchButton = document.getElementById("switch-btn");
  
  const map = new Map({
    basemap: "satellite",
    ground: "world-elevation",
  });

  let mapView = new MapView({
    map,
    container: "viewDiv",
    zoom: 6,
    center: [-4.5, 38.5],
    padding: {
      left: 49,
    },
  });
  // Inicializar la SceneView (vista 3D)
  let sceneView = new SceneView({
    map,
  });

  let activeView = mapView;

  activeView.ui.move("zoom", "top-left");

  // // Cambiar entre MapView (2D) y SceneView (3D)
  // switchButton.addEventListener("click", function () {
  //   if (activeView === mapView) {
  //     // Si estamos en SceneView (3D), cambiamos a MapView (2D)
  //     mapView.container = "viewDiv"; // Activamos MapView
  //     sceneView.container = null; // Desactivamos SceneView
  //     activeView = mapView;
  //     switchButton.classList.remove("boton");
  //     switchButton.classList.add("mostrar");
  //   } else {
  //     // Si la vista activa es MapView (2D), ocultamos el botón
  //     switchButton.classList.add("boton");
  //     switchButton.classList.remove("mostrar");
  //     mapView.container = null; // Activamos MapView
  //     sceneView.container = "viewDiv"; // Desactivamos SceneView
  //     activeView = sceneView;
  //   }
  // });

  // Función para manejar la visibilidad del botón
  // function updateButtonVisibility() {
  //   if (activeView === sceneView) {
  //     // Si la vista activa es SceneView (3D), mostramos el botón
  //     switchButton.classList.add("mostrar");
  //     switchButton.classList.remove("boton");
  //   } else {
  //     // Si la vista activa es MapView (2D), ocultamos el botón
  //     switchButton.classList.add("boton");
  //     switchButton.classList.remove("mostrar");
  //   }
  // }

  // // Llamamos a la función inicialmente para asegurarnos de que el botón se maneje correctamente
  // updateButtonVisibility();

  // // Actualizamos la visibilidad del botón cada vez que cambiamos la vista
  // mapView.watch("viewpoint", updateButtonVisibility);
  // sceneView.watch("viewpoint", updateButtonVisibility);

  //Features
  //Parques Nacionales
  //Extent de parques naturales para usar esas coordendas para que se muestren solo a partir de ellas
  const extentTimanfaya = new Extent({
    xmin: -13.85,
    ymin: 28.95,
    xmax: -13.6,
    ymax: 29.12,
    spatialReference: { wkid: 4326 },
  });

  const extentPicosEuropa = new Extent({
    xmin: -5.25,
    ymin: 42.95,
    xmax: -4.55,
    ymax: 43.45,
    spatialReference: { wkid: 4326 },
  });

  const extentOrdesaMontePerdido = new Extent({
    xmin: -0.1,
    ymin: 42.45,
    xmax: 0.35,
    ymax: 42.75,
    spatialReference: { wkid: 4326 },
  });

  const extentAiguestortes = new Extent({
    xmin: 0.75,
    ymin: 42.4,
    xmax: 1.15,
    ymax: 42.8,
    spatialReference: { wkid: 4326 },
  });

  const extentMonfrague = new Extent({
    xmin: -6.4,
    ymin: 39.6,
    xmax: -5.7,
    ymax: 40.05,
    spatialReference: { wkid: 4326 },
  });

  const extentCabanyeros = new Extent({
    xmin: -5.0,
    ymin: 39.2,
    xmax: -4.2,
    ymax: 39.7,
    spatialReference: { wkid: 4326 },
  });

  const extentTablasDaimiel = new Extent({
    xmin: -4.0,
    ymin: 39.0,
    xmax: -3.55,
    ymax: 39.3,
    spatialReference: { wkid: 4326 },
  });

  const extentSierraGuadarrama = new Extent({
    xmin: -4.3,
    ymin: 40.6,
    xmax: -3.65,
    ymax: 41.05,
    spatialReference: { wkid: 4326 },
  });

  const extentDonana = new Extent({
    xmin: -6.8,
    ymin: 36.85,
    xmax: -6.0,
    ymax: 37.4,
    spatialReference: { wkid: 4326 },
  });

  const extentSierraNevada = new Extent({
    xmin: -3.7,
    ymin: 36.85,
    xmax: -2.6,
    ymax: 37.45,
    spatialReference: { wkid: 4326 },
  });

  const extentGarajonay = new Extent({
    xmin: -17.35,
    ymin: 28.0,
    xmax: -17.05,
    ymax: 28.2,
    spatialReference: { wkid: 4326 },
  });

  const extentTeide = new Extent({
    xmin: -16.9,
    ymin: 28.1,
    xmax: -16.4,
    ymax: 28.5,
    spatialReference: { wkid: 4326 },
  });

  const timanfaya = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/PN_Timanfaya/FeatureServer",
    visible: false,
  });
  const teide = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/PN_Teide/FeatureServer",
    visible: false,
  });
  const taburiente = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/PN_Taburiente/FeatureServer",
    visible: false,
  });
  const sierraNieves = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/_P_N_Sierra_Nieves/FeatureServer",
    visible: false,
  });
  const sierraNevada = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/_P_N_Sierra_Nevada/FeatureServer",
    visible: false,
  });
  const picosEuropa = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/_P_N_Picos_Europa/FeatureServer",
    visible: false,
  });
  const ordesa = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Ordesa/FeatureServer",
    visible: false,
  });
  const monfrague = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Monfrag%C3%BCe/FeatureServer",
    visible: false,
  });
  const islasAtlanticas = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Islas_Atlanticas/FeatureServer",
    visible: false,
  });
  const guadarrama = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Guadarrama/FeatureServer",
    visible: false,
  });
  const garajonay = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Garajonay/FeatureServer",
    visible: false,
  });
  const donana = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Donana/FeatureServer",
    visible: false,
  });
  const daimiel = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Daimiel/FeatureServer",
    visible: false,
  });
  const cabaneros = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Cabaneros/FeatureServer",
    visible: false,
  });
  const cabrera = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Archipielago_Cabrera/FeatureServer",
    visible: false,
  });
  const aiguestortes = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/P_N_Aig%C3%BCestortes/FeatureServer",
    visible: false,
  });

  // Arreglo con las capas y sus extents
  const extentsPN = [
    {
      name: "Parque Nacional Timanfaya",
      extent: extentTimanfaya,
      layer: timanfaya,
    },
    {
      name: "Parque Nacional Picos de Europa",
      extent: extentPicosEuropa,
      layer: picosEuropa,
    },
    {
      name: "Parque Nacional Ordesa y Monte Perdido",
      extent: extentOrdesaMontePerdido,
      layer: ordesa,
    },
    {
      name: "Parque Nacional Aigüestortes i Estany de Sant Maurici",
      extent: extentAiguestortes,
      layer: aiguestortes,
    },
    {
      name: "Parque Nacional Monfragüe",
      extent: extentMonfrague,
      layer: monfrague,
    },
    {
      name: "Parque Nacional Cabañeros",
      extent: extentCabanyeros,
      layer: cabaneros,
    },
    {
      name: "Parque Nacional Tablas de Daimiel",
      extent: extentTablasDaimiel,
      layer: daimiel,
    },
    {
      name: "Parque Nacional Sierra de Guadarrama",
      extent: extentSierraGuadarrama,
      layer: guadarrama,
    },
    { name: "Parque Nacional Doñana", extent: extentDonana, layer: donana },
    {
      name: "Parque Nacional Sierra Nevada",
      extent: extentSierraNevada,
      layer: sierraNevada,
    },
    {
      name: "Parque Nacional Garajonay",
      extent: extentGarajonay,
      layer: garajonay,
    },
    { name: "Parque Nacional Teide", extent: extentTeide, layer: teide },
    {
      name: "Parque Nacional Islas Atlánticas",
      extent: extentTimanfaya,
      layer: islasAtlanticas,
    },
    {
      name: "Parque Nacional Archipiélago de la Cabrera",
      extent: extentTimanfaya,
      layer: cabrera,
    },
    {
      name: "Parque Nacional Sierra de las Nieves",
      extent: extentTimanfaya,
      layer: sierraNieves,
    },
    {
      name: "Parque Nacional de Taburiente",
      extent: extentTimanfaya,
      layer: taburiente,
    },
  ];

  const groupPN = new GroupLayer({
    title: "Senderismo en Parques Nacionales",
    visible: true,
    layers: [
      aiguestortes,
      cabrera,
      cabaneros,
      daimiel,
      donana,
      garajonay,
      guadarrama,
      islasAtlanticas,
      monfrague,
      ordesa,
      picosEuropa,
      sierraNevada,
      sierraNieves,
      taburiente,
      teide,
      timanfaya,
    ],
  });
  map.add(groupPN);

  // const parquesName = [
  //   timanfaya,
  //   teide,
  //   taburiente,
  //   sierraNieves,
  //   sierraNevada,
  //   picosEuropa,
  //   ordesa,
  //   monfrague,
  //   islasAtlanticas,
  //   guadarrama,
  //   garajonay,
  //   donana,
  //   daimiel,
  //   cabaneros,
  //   cabrera,
  //   aiguestortes,
  // ];
  // Función para verificar si la vista está dentro del extent de un parque
  // function isWithinExtent(extent, layerExtent) {
  //   return (
  //     extent.xmin >= layerExtent.xmin &&
  //     extent.xmax <= layerExtent.xmax &&
  //     extent.ymin >= layerExtent.ymin &&
  //     extent.ymax <= layerExtent.ymax
  //   );
  // }
  // // Agregar las capas al mapa inicialmente (pero no visibles)
  // parques.forEach((parque) => map.add(parque.layer));

  // // Función para verificar si la vista está dentro del extent de un parque
  // function isWithinExtent(extent, layerExtent) {
  //   return (
  //     extent.xmin >= layerExtent.xmin &&
  //     extent.xmax <= layerExtent.xmax &&
  //     extent.ymin >= layerExtent.ymin &&
  //     extent.ymax <= layerExtent.ymax
  //   );
  // }

  // // Función para cargar o eliminar capas según el extent de la vista
  // view.watch("extent", function (extent) {
  //   parques.forEach((parque) => {
  //     if (isWithinExtent(extent, parque.extent)) {
  //       if (!map.layers.includes(parque.layer)) {
  //         map.add(parque.layer); // Añadir capa si está dentro del extent del parque
  //       }
  //     } else {
  //       if (map.layers.includes(parque.layer)) {
  //         map.remove(parque.layer); // Eliminar capa si está fuera del extent del parque
  //       }
  //     }
  //   });
  // });

  //FEDME
  const gran = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/Gran_Recorrido/FeatureServer",
  });
  const pequeño = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/Peque%C3%B1o_Recorrido/FeatureServer",
  });
  const local = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/Sendero_Local/FeatureServer",
  });
  const groupFedme = new GroupLayer({
    title: "Senderos FEDME",
    visible: false,
    layers: [gran, pequeño, local],
  });
  map.add(groupFedme);

  //Vias verdes
  const verdes = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/Vias_Verdes/FeatureServer",
    visible: false,
  });
  map.add(verdes);

  //Caminos naturales
  const caminosNaturales = new FeatureLayer({
    url: "https://services7.arcgis.com/2UHDWDNEtFa5iQKi/arcgis/rest/services/Caminos_Naturales/FeatureServer",
    visible: false,
  });
  map.add(caminosNaturales);

  //widgets
  const basemaps = new BasemapGallery({
    view: activeView,
    container: "basemaps-container",
  });
  //home widget
  let homeWidget = new Home({
    view: activeView,
  });
  // adds the home widget to the top left corner of the MapView
  activeView.ui.add(homeWidget, "top-left");

  //bookmark
  const bookmarks = new Bookmarks({
    view: activeView,
    container: "bookmarks-container",
    visibleElements: {
      addBookmarkButton: true,
      collapseButton: true,
      editBookmarkButton: true,
      filter: true,
      heading: true,
      thumbnail: true,
    },
    bookmarks: [
      // array of bookmarks defined manually
      new Bookmark({
        name: "Parque Nacional Timanfaya",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: {
              wkid: 4326,
            },
            xmin: -13.716389,
            ymin: 28.983889,
            xmax: -13.8325,
            ymax: 29.058056,
          },
          scale: 150000,
          rotation: 180,
        },
      }),

      new Bookmark({
        name: "Parque Nacional Picos de Europa",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -5.145,
            ymin: 43.1,
            xmax: -4.716,
            ymax: 43.35,
          },
          scale: 150000,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Ordesa y Monte Perdido",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: 0.01,
            ymin: 42.55,
            xmax: 0.2,
            ymax: 42.7,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Aigüestortes i Estany de Sant Maurici",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: 0.85,
            ymin: 42.5,
            xmax: 1.05,
            ymax: 42.65,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Monfragüe",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -6.3,
            ymin: 39.7,
            xmax: -5.85,
            ymax: 39.95,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Cabañeros",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -4.75,
            ymin: 39.3,
            xmax: -4.3,
            ymax: 39.6,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Tablas de Daimiel",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -3.85,
            ymin: 39.1,
            xmax: -3.65,
            ymax: 39.25,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Sierra de Guadarrama",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -4.15,
            ymin: 40.65,
            xmax: -3.75,
            ymax: 41.0,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Doñana",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -6.7,
            ymin: 36.95,
            xmax: -6.15,
            ymax: 37.35,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Sierra Nevada",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -3.5,
            ymin: 37.0,
            xmax: -2.75,
            ymax: 37.3,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Garajonay",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -17.3,
            ymin: 28.05,
            xmax: -17.15,
            ymax: 28.15,
          },
          scale: 150000,
          // rotation: 270,
        },
      }),
      new Bookmark({
        name: "Parque Nacional Teide",
        viewpoint: {
          targetGeometry: {
            type: "extent",
            spatialReference: { wkid: 4326 },
            xmin: -16.75,
            ymin: 28.2,
            xmax: -16.5,
            ymax: 28.4,
          },
          scale: 150000,
          // rotation: 180,
        },
      }),
    ],
  });

  // // Mapeo entre el nombre del bookmark y la capa correspondiente
  // const parqueMap = {
  //   "Parque Nacional Timanfaya": "timanfaya",
  //   "Parque Nacional Picos de Europa": "picosEuropa",
  //   "Parque Nacional Ordesa y Monte Perdido": "ordesa",
  //   "Parque Nacional Aigüestortes i Estany de Sant Maurici": "aiguestortes",
  //   "Parque Nacional Monfragüe": "monfrague",
  //   "Parque Nacional Cabañeros": "cabaneros",
  //   "Parque Nacional Tablas de Daimiel": "daimiel",
  //   "Parque Nacional Sierra de Guadarrama": "guadarrama",
  //   "Parque Nacional Doñana": "donana",
  //   "Parque Nacional Sierra Nevada": "sierraNevada",
  //   "Parque Nacional Garajonay": "garajonay",
  //   "Parque Nacional Teide": "teide",
  //   "Parque Nacional Taburiente": "taburiente",
  //   "Parque Nacional Islas Atlánticas": "islasAtlanticas",
  //   "Parque Nacional Cabrera": "cabrera",
  // };
  // Evento para manejar la selección del bookmark
  // Verificar si view.extent está disponible y ocultar las capas
  homeWidget.on("go", () => {
    groupPN.layers.forEach((layer) => {
      layer.visible = false;
    });
  });

  // Función que maneja la visibilidad del botón según la vista
  // Obtener el botón desde el HTML

  // Mostrar el botón solo en la vista 3D
  // Función que maneja la visibilidad del botón
  // function toggleButtonView() {
  //   if (activeView === mapView) {
  //     // Ocultar el botón en vista 2D
  //     switchButton.classList.add("boton");
  //   } else {
  //     // Mostrar el botón en vista 3D
  //     switchButton.classList.remove("boton");
  //   }
  // }
  // toggleButtonView();

  bookmarks.bookmarks.forEach(() => {
    bookmarks.on("bookmark-select", (event) => {
      // Obtener el nombre del bookmark seleccionado
      const bookmarkName = event.bookmark.name;

      // Buscar el extent correspondiente al bookmark seleccionado
      const selectedExtent = extentsPN.find(
        (item) => item.name === bookmarkName
      );

      if (selectedExtent) {
        // Hacer visible las capas correspondientes al parque nacional seleccionado
        groupPN.layers.forEach((layer) => {
          layer.visible = true;
        });

        // Configurar el SceneView con el extent seleccionado
        sceneView = new SceneView({
          ground: {
            layers: [esriElevation], // Cargar las elevaciones del servicio
          },
          container: "viewDiv",
          map: map,
          extent: selectedExtent.extent, // Usar el extent del parque nacional
        });
      }
    });
  });

  const bkExpand = new Expand({
    view: activeView,
    content: bookmarks,
    expanded: true,
  });
  activeView.ui.add(bkExpand, "top-right");
  const layerList = new LayerList({
    view: activeView,
    dragEnabled: true,
    visibilityAppearance: "checkbox",
    container: "layers-container",
  });
  //legend
  const legend = new Legend({
    view: activeView,
    container: "legend-container",
  });

  //widgets medir distancia y area y funcionalidad para expanderlo y contraerlo
  // create the measurement widgets and hide them by default
  const distanceMeasurement2D = new DistanceMeasurement2D({
    view: activeView,
    visible: false,
  });

  // Crear un widget Expand para manejar la expansión/contracción de los botones de medición
  const measurementExpand = new Expand({
    view: activeView,
    content: document.getElementById("topbar"), // Contenedor de los botones
    expandIcon: "measure-line", // Icono de medición
    expanded: false, // Inicia contraído
  });
  activeView.ui.add(measurementExpand, "top-right");

  //Full screen widget
  fullscreen = new Fullscreen({
    view: activeView,
  });
  activeView.ui.add(fullscreen, "top-left");

  //locate
  let locateWidget = new Locate({
    view: activeView, // Attaches the Locate button to the view
    graphic: new Graphic({
      symbol: { type: "simple-marker" }, // overwrites the default symbol used for the
      // graphic placed at the location of the user when found
    }),
  });

  activeView.ui.add(locateWidget, "top-left");

  //scalebar
  let scaleBar = new ScaleBar({
    view: activeView,
  });
  // Add widget to the bottom left corner of the view
  activeView.ui.add(scaleBar, {
    position: "bottom-left",
  });

  let activeWidget;

  const handleActionBarClick = ({ target }) => {
    if (target.tagName !== "CALCITE-ACTION") {
      return;
    }

    if (activeWidget) {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
    }

    const nextWidget = target.dataset.actionId;
    if (nextWidget !== activeWidget) {
      document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
      document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
      activeWidget = nextWidget;
    } else {
      activeWidget = null;
    }
  };

  document
    .querySelector("calcite-action-bar")
    .addEventListener("click", handleActionBarClick);

  let actionBarExpanded = false;

  document.addEventListener("calciteActionBarToggle", (event) => {
    actionBarExpanded = !actionBarExpanded;
    view.padding = {
      left: actionBarExpanded ? 150 : 49,
    };
  });

  document.querySelector("calcite-shell").hidden = false;
  document.querySelector("calcite-loader").hidden = true;
});
