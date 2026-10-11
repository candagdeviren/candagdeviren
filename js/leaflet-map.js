const leafletMap = L.map('leaflet-map', {
  minZoom: 2,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0
}).setView([38.4, 26.6], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  noWrap: true,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(leafletMap);

const places = [
  { name: 'Çeşme Marina',      coords: [38.3245, 26.3020] },
  { name: 'Dalyan, Çeşme',     coords: [38.3655, 26.3115] },
  { name: 'Ayayorgi Bay',      coords: [38.3150, 26.2960] },
  { name: 'Boyalık Bay',       coords: [38.3220, 26.3480] },
  { name: 'Ilıca',             coords: [38.3110, 26.3740] },
  { name: 'Port Alaçatı',      coords: [38.2560, 26.3690] },
  { name: 'Alaçatı',           coords: [38.2830, 26.3730] },
  { name: 'Urla İskele',       coords: [38.3720, 26.7720] },
  { name: 'Sığacık Marina',    coords: [38.1955, 26.7850] },
  { name: 'İzmir Levent Marina', coords: [38.4050, 27.0750] }
  
];

// Issue 1: marker'ları bir grupta topla, zoom'a göre göster/gizle
const markerLayer = L.layerGroup();
places.forEach(p => L.marker(p.coords).bindPopup(p.name).addTo(markerLayer));

const ZOOM_THRESHOLD = 8;
function updateMarkers() {
  if (leafletMap.getZoom() >= ZOOM_THRESHOLD) {
    leafletMap.addLayer(markerLayer);
  } else {
    leafletMap.removeLayer(markerLayer);
  }
}
leafletMap.on('zoomend', updateMarkers);
updateMarkers();