
import math

SEA_LEVEL_TEMPERATURE = 15.0  # °C (standard conditions)
LAPSE_RATE = 6.5  # °C per 1000m (temperature decrease with altitude)


def Temperature(altitude: float, is_descending: bool = False) -> float:
    """Calculate temperature at given altitude.
    
    Uses tropospheric lapse rate: ~6.5°C per 1000m.
    
    Args:
        altitude: Altitude in meters.
        is_descending: Whether the CanSat is descending (parachute deployed).
    
    Returns:
        Temperature in °C.
    """
    if altitude < 0:
        altitude = 0
    
    temp = SEA_LEVEL_TEMPERATURE - (LAPSE_RATE * altitude / 1000.0)
    
    if is_descending and altitude < 100:
        temp = temp + 2.0
    
    return round(temp, 2)
