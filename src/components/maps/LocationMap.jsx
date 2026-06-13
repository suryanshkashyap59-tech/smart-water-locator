import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function LocationMap({ lat, lon, location }) {
  if (!lat || !lon) return null

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={16}
      style={{
        height: '400px',
        width: '100%',
        borderRadius: '16px'
      }}
    >
      <TileLayer
  attribution="Esri"
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
/>

      <Marker position={[lat, lon]}>
  <Popup>
    <strong>{location}</strong>
    <br />
    Lat: {lat}
    <br />
    Lon: {lon}
  </Popup>
</Marker>

<Circle
  center={[lat, lon]}
  radius={1000}
/>

</MapContainer>
)
}
