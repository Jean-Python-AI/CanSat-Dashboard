"""
Statistics calculation service.
"""
import math
from typing import TypedDict


class FlightStatistics(TypedDict):
    max_altitude: float
    max_acceleration_g: float
    avg_fall_speed_m_s: float
    fall_distance_m: float
    distance_m: float
    max_temperature: float
    min_temperature: float
    avg_temperature: float
    max_pressure: float
    min_pressure: float
    avg_pressure: float
    state: str
    data_points: int
    flight_duration_s: float


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    a = (math.sin(delta_phi / 2) ** 2 + 
         math.cos(phi1) * math.cos(phi2) * 
         math.sin(delta_lambda / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c


def calculate_statistics(data: list[dict]) -> FlightStatistics:
    if not data:
        raise ValueError("No data provided")
    
    n = len(data)
    altitudes = [d['altitude'] for d in data]
    temperatures = [d['temperature'] for d in data]
    pressures = [d['pressure'] for d in data]
    
    max_altitude = max(altitudes)
    max_temperature = max(temperatures)
    min_temperature = min(temperatures)
    avg_temperature = sum(temperatures) / n
    max_pressure = max(pressures)
    min_pressure = min(pressures)
    avg_pressure = sum(pressures) / n
    
    max_acceleration = 0.0
    for i in range(1, n):
        delta_alt = data[i]['altitude'] - data[i-1]['altitude']
        delta_time = data[i]['time'] - data[i-1]['time']
        if delta_time > 0:
            acceleration = abs(delta_alt / delta_time) / 9.81
            max_acceleration = max(max_acceleration, acceleration)
    
    max_alt_index = altitudes.index(max_altitude)
    ground_alt = altitudes[-1]
    fall_end_index = n - 1
    for i in range(max_alt_index + 2, n - 1):
        if abs(altitudes[i] - ground_alt) < 2:
            fall_end_index = i
            break
    
    fall_distance = max_altitude - altitudes[fall_end_index]
    fall_time = data[fall_end_index]['time'] - data[max_alt_index]['time']
    avg_fall_speed = fall_distance / fall_time if fall_time > 0 else 0
    
    distance = haversine_distance(
        data[0]['latitude'], data[0]['longitude'],
        data[-1]['latitude'], data[-1]['longitude']
    )
    
    start_alt = altitudes[0]
    state = "ground"
    if max_altitude > start_alt + 15:
        is_falling = any(
            altitudes[i] < altitudes[i-1] - 2 
            for i in range(max_alt_index + 1, n - 1)
        )
        is_landed = any(
            abs(altitudes[i] - altitudes[i-1]) < 1
            for i in range(max(3, max_alt_index + 3), n - 1)
        )
        
        if is_landed:
            state = "landed"
        elif is_falling:
            state = "falling"
        elif altitudes[-1] > start_alt + 15:
            state = "rocket"
    
    return FlightStatistics(
        max_altitude=round(max_altitude, 2),
        max_acceleration_g=round(max_acceleration, 2),
        avg_fall_speed_m_s=round(avg_fall_speed, 2),
        fall_distance_m=round(fall_distance, 2),
        distance_m=round(distance, 2),
        max_temperature=round(max_temperature, 2),
        min_temperature=round(min_temperature, 2),
        avg_temperature=round(avg_temperature, 2),
        max_pressure=round(max_pressure, 2),
        min_pressure=round(min_pressure, 2),
        avg_pressure=round(avg_pressure, 2),
        state=state,
        data_points=n,
        flight_duration_s=round(data[-1]['time'] - data[0]['time'], 2)
    )
