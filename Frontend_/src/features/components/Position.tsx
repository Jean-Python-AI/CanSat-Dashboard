import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import L from 'leaflet'

interface PositionProps {
  latitude: number
  longitude: number
  gpsPath: number[][]
}

function FixMarkerPosition({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView([lat, lng], map.getZoom())
  }, [lat, lng, map])
  
  return null
}

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const pathIcon = L.divIcon({
  className: 'custom-path-marker',
  html: '<div style="background-color: #ef4444; width: 8px; height: 8px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 3px rgba(0,0,0,0.5);"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
})

L.Marker.prototype.options.icon = defaultIcon

function Position({ latitude, longitude, gpsPath }: PositionProps) {
  const [selectedPoint, setSelectedPoint] = useState<[number, number] | null>(null)
  
  const isValidPosition = latitude !== 0 && longitude !== 0
  const hasPath = gpsPath.length > 1

  const displayLat = selectedPoint ? selectedPoint[0] : latitude
  const displayLon = selectedPoint ? selectedPoint[1] : longitude

  return (
    <div className="bg-zinc-800 rounded-2xl w-full h-full flex flex-col overflow-hidden">
      <div className="px-3 pt-2 pb-1 flex-shrink-0">
        <h1 className="text-xs font-bold text-zinc-400 uppercase tracking-wide">position</h1>
      </div>
      
      <div className="flex-1 min-h-0 px-1 pb-1">
        {isValidPosition ? (
          <MapContainer 
            center={[latitude, longitude]} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hasPath && (
              <>
                <Polyline 
                  positions={gpsPath as LatLngExpression[]} 
                  color="#ef4444" 
                  weight={3} 
                  opacity={0.8}
                />
                {gpsPath.map((point, index) => (
                  <Marker 
                    key={index}
                    position={point as LatLngExpression}
                    icon={pathIcon}
                    eventHandlers={{
                      click: () => setSelectedPoint(point as [number, number])
                    }}
                  />
                ))}
              </>
            )}
            <Marker position={[latitude, longitude]} />
            <FixMarkerPosition lat={latitude} lng={longitude} />
          </MapContainer>
        ) : (
          <div className="h-full w-full bg-zinc-700 flex items-center justify-center">
            <span className="text-zinc-400">Aucune position GPS disponible</span>
          </div>
        )}
      </div>

      <div className="px-3 py-1 flex-shrink-0 flex gap-3 items-center bg-zinc-800/50">
        <div className="flex items-center gap-1">
          <span className="text-zinc-500 text-xs">Lat:</span>
          <span className="text-white font-mono text-xs">{displayLat.toFixed(6)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-zinc-500 text-xs">Lon:</span>
          <span className="text-white font-mono text-xs">{displayLon.toFixed(6)}</span>
        </div>
        {selectedPoint && (
          <button 
            onClick={() => setSelectedPoint(null)}
            className="ml-auto text-xs text-zinc-400 hover:text-white underline"
          >
            Revenir
          </button>
        )}
      </div>
    </div>
  )
}

export default Position
