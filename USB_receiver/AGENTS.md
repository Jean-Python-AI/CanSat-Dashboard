# AGENTS.md - CanSat USB Receiver Project

## Project Overview
This is a Python-based CanSat simulation project that simulates altitude, position (GPS), pressure, and temperature data, then sends it to a Django backend.

## Build/Lint/Test Commands

### Running the Simulation
```bash
python MainSimulation.py
```

### Running Individual Simulation Modules
```bash
python -c "from AltitudeSimulation import Altitude; print(Altitude(10))"
python -c "from PositionSimulation import GPS; print(GPS(10))"
```

### Running Tests (pytest)
```bash
pytest                    # Run all tests
pytest -v                # Verbose output
pytest -k test_name      # Run specific test by name
pytest --cov             # With coverage
```

### Running a Single Test
```bash
pytest tests/test_file.py::TestClass::test_method
pytest -x                # Stop on first failure
```

### Linting/Type Checking
```bash
ruff check .             # Lint all Python files
ruff check --fix .       # Fix issues automatically
mypy .                   # Type checking
black .                  # Format code
```

## Code Style Guidelines

### Imports
- Standard library imports first
- Third-party imports second
- Local/project imports third
- Separate each group with a blank line
- Example:
  ```python
  import time
  import math
  
  import requests
  
  from AltitudeSimulation import Altitude
  from PositionSimulation import GPS
  ```

### Formatting
- Use 4 spaces for indentation (not tabs)
- Maximum line length: 100 characters
- Use blank lines sparingly to separate logical sections (2 blank lines between top-level definitions)
- Use whitespace around operators: `a + b` not `a+b`

### Types
- Add type hints for function parameters and return values
- Use `typing` module for complex types
- Example:
  ```python
  def Altitude(t: float) -> float:
      ...
  ```

### Naming Conventions
- **Functions**: `snake_case` (e.g., `Altitude`, `get_gps_position`)
- **Variables**: `snake_case` (e.g., `launch_name`, `django_url`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `BAUDRATE`, `MAX_ALTITUDE`)
- **Classes**: `PascalCase` (e.g., `DataHandler`)
- Avoid single-letter variable names except in short loops (use `i`, `j` for loop indices)

### Functions
- Keep functions small and focused (single responsibility)
- Use descriptive names that indicate purpose
- Add docstrings for public functions:
  ```python
  def calculate_altitude(time: float) -> float:
      """Calculate altitude at given time during flight.
      
      Args:
          time: Time in seconds since launch.
      
      Returns:
          Altitude in meters.
      """
  ```
- Private functions should be prefixed with `_`

### Error Handling
- Use specific exception types rather than bare `except:`
- Always log or print errors with context
- Example:
  ```python
  try:
      response = requests.post(url, json=data)
  except requests.RequestException as e:
      print(f"Failed to send data: {e}")
      time.sleep(1)
  ```

### Constants
- Define magic numbers as named constants at module level
- Group related constants into classes or named tuples
- Example:
  ```python
  GRAVITY = 9.8  # m/s²
  TERMINAL_VELOCITY = -8.0  # m/s
  MAX_ALTITUDE = 500.0  # meters
  ```

### Code Comments
- Use comments to explain *why*, not *what*
- Keep comments up-to-date with code changes
- Use English for code comments (preferred for international collaboration)
- Remove commented-out code before committing

### File Organization
- One module per file
- Group related modules in packages (directories with `__init__.py`)
- Main entry point should be clearly identifiable (e.g., `MainSimulation.py`)

### Testing
- Test files should be in a `tests/` directory
- Use `pytest` as the test framework
- Follow naming convention: `test_<module_name>.py`
- Use descriptive test names: `test_altitude_returns_zero_for_negative_time()`
- Use fixtures for common test setup

### Dependencies
- Add new dependencies to `requirements.txt` or `pyproject.toml`
- Pin versions for reproducibility
- Use virtual environments: `python -m venv venv`

### Git Conventions
- Write meaningful commit messages
- Use branches for features/fixes
- Run linting before committing
