
import math

SEA_LEVEL_PRESSURE = 1013.25  # hPa
SCALE_HEIGHT = 8400  # meters (atmospheric scale height)


def Pressure(altitude: float) -> float:
    """Calculate atmospheric pressure at given altitude.
    
    Uses barometric formula: P = P0 * exp(-h / H)
    
    Args:
        altitude: Altitude in meters.
    
    Returns:
        Pressure in hPa.
    """
    if altitude < 0:
        altitude = 0
    pressure = SEA_LEVEL_PRESSURE * math.exp(-altitude / SCALE_HEIGHT)
    return round(pressure, 2)
