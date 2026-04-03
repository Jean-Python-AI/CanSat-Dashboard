import type { BonusData } from '../../services/api'

interface TelemetryGridProps {
  isLive: boolean
  temperature: number
  pressure: number
  altitude: number
  bonusData: BonusData | null
}

function TelemetryGrid({ 
  isLive, 
  temperature, 
  pressure, 
  altitude,
  bonusData
}: TelemetryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full h-full">

      <div className="px-4 py-4 md:py-8 flex flex-col justify-center items-end h-full flex-col gap-2">
        <h1 className="text-end font-bold text-3xl lg:text-2xl md:text-3xl">
          Hello,{isLive ? ' ' : ''}
          <br />
          the Dashboard {isLive ? 'is' : 'was'}
        </h1>
        <div className={`flex flex-row items-center gap-2 py-1 pl-4 pr-3 lg:pr-2 lg:pl-3 ${isLive ? 'bg-green-800' : 'bg-gray-800'} rounded-3xl border-2 ${isLive ? 'border-green-700' : 'border-gray-700'}`}>
          {isLive ? (
            <>
              <h1 className="font-bold text-green-200 text-xl lg:text-lg">live</h1>
              <div className="w-3 h-3 rounded-xl bg-green-500 animate-pulse" />
            </>
          ) : (
            <>
              <h1 className="font-bold text-gray-200 text-xl lg:text-lg">recorded</h1>
              <div className="w-3 h-3 rounded-xl bg-gray-500" />
            </>
          )}
        </div>
      </div>

      <div className="bg-zinc-800 rounded-2xl px-4 pt-4 pb-4 flex flex-col">
        <div className='w-full flex flex-rows justify-between'>
          <h1 className="text-ms font-bold text-zinc-400 lg:text-xs">position</h1>
          <p className='xl:text-xl lg:text-sm font-bold text-zinc-300 ml-4'>last altitude</p>
        </div>
        <div className="w-full flex flex-row items-end justify-end gap-2">
          <div className="flex flex-row items-start justify-end gap-1">
            <h1 className="text-xl xl:text-4xl font-bold">{altitude.toFixed(1)}</h1>
            <h1 className="text-xl font-bold mt-1 text-zinc-400">m</h1>
          </div>
        </div>
        <div className="flex-1 pt-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Max Altitude</span>
              <span className="text-lg font-bold text-zinc-300">{bonusData ? `${bonusData.max_altitude.toFixed(1)}m` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Max Accélération</span>
              <span className="text-lg font-bold text-zinc-300">{bonusData ? `${bonusData.max_acceleration_g.toFixed(1)}g` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Vitesse de chute</span>
              <span className="text-lg font-bold text-zinc-300">{bonusData ? `${bonusData.avg_fall_speed_m_s.toFixed(1)}m/s` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Distance</span>
              <span className="text-lg font-bold text-zinc-300">{bonusData ? `${bonusData.distance_m.toFixed(1)}m` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-rows justify-between items-center col-span-2">
              <span className="text-xs text-zinc-300 uppercase tracking-wide">Durée de vol</span>
              <span className="text-lg font-bold text-zinc-200">{bonusData ? `${bonusData.flight_duration_s.toFixed(1)}s` : '-'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 rounded-2xl px-4 py-4 flex flex-col">
        <div className='w-full flex flex-rows justify-between'>
          <h1 className="text-ms font-bold text-zinc-400 lg:text-xs">pressure</h1>
          <p className='text-xl lg:text-sm  font-bold text-zinc-300'>last pressure</p>
        </div>
        <div className="w-full flex flex-row items-end justify-end gap-2">
          <div className="flex flex-row items-start justify-end gap-1">
            <h1 className="text-xl xl:text-4xl font-bold">{pressure.toFixed(1)}</h1>
            <h1 className="text-xl font-bold mt-2 text-zinc-400">hPa</h1>
          </div>
        </div>
        <div className="flex-1 pt-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Max</span>
              <span className="text-lg font-bold text-zinc-200">{bonusData ? `${bonusData.max_pressure.toFixed(1)}hPa` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Min</span>
              <span className="text-lg font-bold text-zinc-200">{bonusData ? `${bonusData.min_pressure.toFixed(1)}hPa` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-rows justify-between items-center col-span-2">
              <span className="text-xs text-zinc-300 uppercase tracking-wide">Moyenne</span>
              <span className="text-lg font-bold text-zinc-200">{bonusData ? `${bonusData.avg_pressure.toFixed(1)}hPa` : '-'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 rounded-xl px-4 py-4 flex flex-col">
        <div className='w-full flex flex-rows justify-between'>
          <h1 className="text-ms font-bold text-zinc-400 lg:text-xs">temperature</h1>
          <p className='text-xl lg:text-sm  font-bold text-zinc-300'>last temperature</p>
        </div>
        <div className="w-full flex flex-row items-end justify-end gap-2">
          <div className="flex flex-row items-start justify-end gap-1">
            <h1 className="text-xl xl:text-4xl font-bold">{temperature.toFixed(1)}</h1>
            <h1 className="text-xl font-bold mt-2 text-zinc-400">°C</h1>
          </div>
        </div>
        <div className="flex-1 pt-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Max</span>
              <span className="text-lg font-bold text-zinc-200">{bonusData ? `${bonusData.max_temperature.toFixed(1)}°C` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase tracking-wide">Min</span>
              <span className="text-lg font-bold text-zinc-200">{bonusData ? `${bonusData.min_temperature.toFixed(1)}°C` : '-'}</span>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-2 flex flex-rows justify-between items-center col-span-2">
              <span className="text-xs text-zinc-300 uppercase tracking-wide">Moyenne</span>
              <span className="text-lg font-bold text-zinc-200">{bonusData ? `${bonusData.avg_temperature.toFixed(1)}°C` : '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TelemetryGrid
