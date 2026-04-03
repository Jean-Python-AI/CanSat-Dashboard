const API_BASE_URL = 'http://127.0.0.1:8000/data';

export interface Launch {
  id: number;
  name: string;
  created_at: string;
  data_count: number;
  is_recording: boolean;
  live: boolean;
}

export interface TelemetryData {
  time: number[];
  data: number[];
}

export interface BonusData {
  max_altitude: number;
  max_acceleration_g: number;
  avg_fall_speed_m_s: number;
  fall_distance_m: number;
  distance_m: number;
  max_temperature: number;
  min_temperature: number;
  avg_temperature: number;
  max_pressure: number;
  min_pressure: number;
  avg_pressure: number;
  state: string;
  data_points: number;
  flight_duration_s: number;
  launch_id: number;
}

export async function fetchLaunches(): Promise<Launch[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/launches/`)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    const result = await response.json()
    return result.launches || []
  } catch (error) {
    console.error('Failed to fetch launches:', error)
    throw error
  }
}

export async function fetchLaunch(launchId: number): Promise<Launch | null> {
  try {
    const launches = await fetchLaunches()
    return launches.find(l => l.id === launchId) || null
  } catch (error) {
    console.error('Failed to fetch launch:', error)
    throw error
  }
}

export async function fetchTelemetryData(launchId: number, field: string): Promise<TelemetryData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${launchId}/${field}/`)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${field} data:`, error)
    throw error
  }
}

export async function fetchBonusData(launchId: number): Promise<BonusData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${launchId}/bonus_datas/`)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch bonus data:', error)
    throw error
  }
}

export async function stopRecording(launchId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/launch/${launchId}/stop/`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to stop recording:', error)
    throw error
  }
}

export async function startRecording(launchId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/launch/${launchId}/start/`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to start recording:', error)
    throw error
  }
}

export async function startNewRecording(name?: string): Promise<{ launch_id: number; launch_name: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/start/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to start new recording:', error)
    throw error
  }
}

export async function deleteLaunch(launchId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/launch/${launchId}/delete/`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to delete launch:', error)
    throw error
  }
}

export async function updateLaunch(launchId: number, name: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/launch/${launchId}/update/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to update launch:', error)
    throw error
  }
}
