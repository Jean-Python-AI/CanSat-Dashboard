
import random
import math

EARTH_RADIUS = 6371000  # meters


def GPS(time: float, altitude: float, prev_lat: float, prev_lon: float) -> tuple[float, float]:
    """Calculate GPS position drift based on altitude and time.
    
    Simulates small horizontal drift due to wind during flight.
    Position changes are minimal (< 100m horizontal drift typical).
    
    Args:
        time: Current mission time in seconds.
        altitude: Current altitude in meters.
        prev_lat: Previous latitude.
        prev_lon: Previous longitude.
    
    Returns:
        Tuple of (latitude, longitude).
    """
    if altitude < 10:
        drift_factor = 0.0001
    else:
        drift_factor = 0.0002
    
    wind_direction = (math.sin(time * 0.1) + 1) * 0.5
    
    lat_drift = drift_factor * wind_direction * random.uniform(0.8, 1.2)
    lon_drift = drift_factor * (1 - wind_direction) * random.uniform(0.8, 1.2)
    
    new_lat = prev_lat + lat_drift
    new_lon = prev_lon + lon_drift
    
    return round(new_lat, 6), round(new_lon, 6)
