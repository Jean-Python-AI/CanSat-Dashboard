
import time
import requests

from AltitudeSimulation import Altitude
from PositionSimulation import GPS
from PressureSimulation import Pressure
from TemperatureSimulation import Temperature


BAUDRATE = 115200

DJANGO_URL = "http://127.0.0.1:8000/data/read/"

LAUNCH_NAME = "CanSat_Mission"

ALTITUDE_MAX = 500.0
TERMINAL_VELOCITY = -8.0  # m/s


def is_descending(altitude: float, time: float) -> bool:
    """Determine if CanSat is descending based on flight phase."""
    g = 9.8
    a = 20.0
    alpha = 0.5 * a + (a ** 2) / (2 * g)
    t_b = (ALTITUDE_MAX / alpha) ** 0.5
    t_apogee = t_b + (a * t_b) / g
    return time > t_apogee


data = {
    "launch_name": LAUNCH_NAME,
    "time": 0,
    "altitude": 0.0,
    "temperature": 0.0,
    "pressure": 0.0,
    "latitude": 48.85,
    "longitude": 2.35,
}

while True:
    data["altitude"] = Altitude(data["time"])
    data["pressure"] = Pressure(data["altitude"])
    
    descending = is_descending(data["altitude"], data["time"])
    data["temperature"] = Temperature(data["altitude"], descending)
    
    data["latitude"], data["longitude"] = GPS(
        data["time"],
        data["altitude"],
        data["latitude"],
        data["longitude"],
    )

    try:
        response = requests.post(DJANGO_URL, json=data)
        print(f"Time: {data['time']}s | Alt: {data['altitude']:.1f}m | "
              f"Temp: {data['temperature']:.1f}°C | Press: {data['pressure']:.1f}hPa | "
              f"Lat: {data['latitude']:.6f} | Lon: {data['longitude']:.6f} | "
              f"Status: {response.status_code}")
        time.sleep(1)
    except requests.RequestException as e:
        print(f"Error: {e}")
        time.sleep(1)

    if data["altitude"] <= 0 and data["time"] >= 15:
        break

    data["time"] += 1
