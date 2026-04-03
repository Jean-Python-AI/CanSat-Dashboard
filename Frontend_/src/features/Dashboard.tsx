import { useState, useEffect } from 'react'
import { fetchTelemetryData, fetchLaunch, fetchBonusData, type BonusData } from '../services/api'
import TelemetryGrid from './components/TelemetryGrid'
import Position from './components/Position'
import Graphs from './components/Graphs'

interface DashboardProps {
  launchID: number
}

function Dashboard({ launchID }: DashboardProps) {
  const [temperature, setTemperature] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [altitude, setAltitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [gpsPath, setGpsPath] = useState<number[][]>([])
  const [temperatureData, setTemperatureData] = useState<{ time: number; value: number }[]>([])
  const [altitudeData, setAltitudeData] = useState<{ time: number; value: number }[]>([])
  const [pressureData, setPressureData] = useState<{ time: number; value: number }[]>([])
  const [bonusData, setBonusData] = useState<BonusData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!launchID) return

    const fetchAllData = async () => {
      try {
        setError(null)
        
        const [launch, bonusData, tempApiData, pressureApiData, altitudeApiData, latData, lonData] = await Promise.all([
          fetchLaunch(launchID),
          fetchBonusData(launchID),
          fetchTelemetryData(launchID, 'temperature'),
          fetchTelemetryData(launchID, 'pressure'),
          fetchTelemetryData(launchID, 'altitude'),
          fetchTelemetryData(launchID, 'latitude'),
          fetchTelemetryData(launchID, 'longitude'),
        ])

        if (launch) {
          setIsLive(launch.live)
        }

        setBonusData(bonusData)

        const tempChartData = tempApiData.time.map((t, i) => ({ time: t, value: tempApiData.data[i] }))
        const pressChartData = pressureApiData.time.map((t, i) => ({ time: t, value: pressureApiData.data[i] }))
        const altChartData = altitudeApiData.time.map((t, i) => ({ time: t, value: altitudeApiData.data[i] }))

        setTemperatureData(tempChartData)
        setPressureData(pressChartData)
        setAltitudeData(altChartData)

        const newTemp = tempApiData.data[tempApiData.data.length - 1] ?? 0
        const newPressure = pressureApiData.data[pressureApiData.data.length - 1] ?? 0
        const newAltitude = altitudeApiData.data[altitudeApiData.data.length - 1] ?? 0

        setTemperature(newTemp)
        setPressure(newPressure)
        setAltitude(newAltitude)

        const newLat = latData.data[latData.data.length - 1] ?? 0
        const newLon = lonData.data[lonData.data.length - 1] ?? 0
        setLatitude(newLat)
        setLongitude(newLon)

        const path = latData.data.map((lat, i) => [lat, lonData.data[i] ?? 0] as number[]).filter(([lat, lon]) => lat !== 0 && lon !== 0)
        setGpsPath(path)
      } catch (err) {
        console.error('Failed to fetch telemetry:', err)
        setError('Failed to load telemetry data')
      }
    }

    fetchAllData()

    const interval = setInterval(fetchAllData, 1000)
    return () => clearInterval(interval)
  }, [launchID])

  return (
    <div className="min-h-screen p-2 md:p-4 flex flex-col gap-2 md:gap-4">
      {error && (
        <div className="bg-red-800 text-red-100 px-4 py-2 rounded-xl font-bold">
            {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 h-[35vh] lg:h-auto lg:flex-1 lg:min-h-0">
        <div className="min-h-0 h-full">
          <TelemetryGrid
            isLive={isLive}
            temperature={temperature}
            pressure={pressure}
            altitude={altitude}
            bonusData={bonusData}
          />
        </div>
        <div className="min-h-0 h-full">
          <Position latitude={latitude} longitude={longitude} gpsPath={gpsPath} />
        </div>
      </div>

      <Graphs
        temperatureData={temperatureData}
        pressureData={pressureData}
        altitudeData={altitudeData}
      />
    </div>
  )
}

export default Dashboard
