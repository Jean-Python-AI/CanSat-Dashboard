"""
Constants used across the API.
"""
from typing import Final

LIVE_THRESHOLD_SECONDS: Final[int] = 10

ALLOWED_GRAPH_FIELDS: Final[list[str]] = [
    "altitude",
    "temperature",
    "pressure",
    "latitude",
    "longitude",
]

DEFAULT_LAUNCH_NAME_PREFIX: Final[str] = "Launch"

GROUND_ALTITUDE_THRESHOLD: Final[float] = 2.0
ROCKET_ALTITUDE_THRESHOLD: Final[float] = 15.0
FALL_DETECTION_THRESHOLD: Final[float] = 2.0
