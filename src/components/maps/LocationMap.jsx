import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
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
<Marker
  position={[
    Number(lat) + 0.001,
    Number(lon) + 0.001
  ]}
>
  <Popup>
    ⭐ Recommended Borewell Location
  </Popup>
</Marker>
        <Popup>
          <strong>{location}</strong>
          <br />
          Lat: {lat}
          <br />
          Lon: {lon}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
