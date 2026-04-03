import { useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface GraphsProps {
  temperatureData: { time: number; value: number }[]
  pressureData: { time: number; value: number }[]
  altitudeData: { time: number; value: number }[]
}

interface CustomTooltipProps {
  active?: boolean
  payload?: { value: number; name: string; color: string }[]
  label?: number
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-2xl text-sm">
        <p className="text-zinc-400 text-xs mb-1">Temps: {label?.toFixed(1)}s</p>
        {payload.map((entry, index) => (
          entry.value !== null && (
            <div key={index} className="font-bold font-zinc-200 flex flex-rows items-center justify-start gap-2">
                <div style={{ backgroundColor: entry.color }} className='w-2 h-2 rounded-xl'/>
                <p>{entry.name}: {entry.value.toFixed(1)}</p>
            </div>
          )
        ))}
      </div>
    )
  }
  return null
}

function Graphs({ temperatureData, pressureData, altitudeData }: GraphsProps) {
  const [visibleLines, setVisibleLines] = useState({
    temperature: true,
    pressure: true,
    altitude: true,
  })

  const toggleLine = (line: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({ ...prev, [line]: !prev[line] }))
  }

  const combinedData = temperatureData.map((item, index) => ({
    time: item.time,
    temperature: item.value,
    pressure: pressureData[index]?.value ?? null,
    altitude: altitudeData[index]?.value ?? null,
  }))

  return (
    <div className="relative flex-1 min-h-0 bg-zinc-800 rounded-2xl p-2 md:p-4 h-[30vh] md:h-[50vh]">
      <div className="absolute top-2 md:top-4 left-2 md:left-4 flex gap-1 md:gap-2 z-10 flex-wrap">
        <button
          onClick={() => toggleLine('temperature')}
          className={`px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold transition-colors border-2 ${
            visibleLines.temperature
              ? 'bg-red-700/70 text-white border-red-500/80'
              : 'bg-zinc-600 text-zinc-400 border-zinc-500'
          }`}
        >
          Température
        </button>
        <button
          onClick={() => toggleLine('pressure')}
          className={`px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold transition-colors border-2 ${
            visibleLines.pressure
              ? 'bg-green-700/70 text-white border-green-500/80'
              : 'bg-zinc-600 text-zinc-400 border-zinc-500'
          }`}
        >
          Pression
        </button>
        <button
          onClick={() => toggleLine('altitude')}
          className={`px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold transition-colors border-2 ${
            visibleLines.altitude
              ? 'bg-blue-700/70 text-white border-blue-500/80'
              : 'bg-zinc-600 text-zinc-400 border-zinc-500'
          }`}
        >
          Altitude
        </button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData}>
          <XAxis
            dataKey="time"
            tick={{ fill: '#71717a', fontSize: 12 }}
            tickFormatter={(value) => `${value}s`}
            axisLine={{ stroke: '#3f3f46' }}
            tickLine={{ stroke: '#3f3f46' }}
            label={{
              value: 'Temps (s)',
              position: 'bottom',
              fill: '#71717a',
              fontSize: 12,
            }}
          />
          <YAxis yAxisId="temperature" hide />
          <YAxis yAxisId="pressure" hide />
          <YAxis yAxisId="altitude" hide />
          <Tooltip content={<CustomTooltip />} />
          {visibleLines.temperature && (
            <Line
              yAxisId="temperature"
              type="monotone"
              dataKey="temperature"
              stroke="#ff5f5f"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name="Température (°C)"
              activeDot={{ r: 6, stroke: '#ff3131', strokeWidth: 2, fill: '#27272a' }}
            />
          )}
          {visibleLines.pressure && (
            <Line
              yAxisId="pressure"
              type="monotone"
              dataKey="pressure"
              stroke="#34D399"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name="Pression (hPa)"
              activeDot={{ r: 6, stroke: '#00ffa2', strokeWidth: 2, fill: '#27272a' }}
            />
          )}
          {visibleLines.altitude && (
            <Line
              yAxisId="altitude"
              type="monotone"
              dataKey="altitude"
              stroke="#2481fb"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name="Altitude (m)"
              activeDot={{ r: 6, stroke: '#00a6ff', strokeWidth: 2, fill: '#27272a' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graphs
