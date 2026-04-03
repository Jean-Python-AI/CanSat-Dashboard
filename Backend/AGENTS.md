# AGENTS.md - CanSat Backend

This document provides guidelines for agents working on the CanSat Backend project.

## Project Overview

- **Framework**: Django 5.1.15
- **Language**: Python 3.11+
- **Database**: SQLite3 (db.sqlite3)
- **Structure**: Django project at `src/CanSat`, app at `src/DATA_API`

## Build/Test Commands

### Running the Development Server
```bash
cd src
python manage.py runserver
```

### Database Migrations
```bash
# After model changes
python manage.py makemigrations
python manage.py migrate
```

### Running Tests
```bash
python manage.py test
python manage.py test DATA_API
```

### Admin Access
```bash
python manage.py createsuperuser
```

### Django Check
```bash
python manage.py check
```

## Project Structure

```
DATA_API/
├── __init__.py
├── models.py              # Launch, Data models
├── admin.py               # Django admin (configured)
├── urls.py                # Main URL routing (includes api/urls.py)
├── apps.py
├── tests.py
├── api/
│   ├── __init__.py
│   ├── constants.py       # Shared constants (LIVE_THRESHOLD_SECONDS, etc.)
│   ├── urls.py            # API endpoints
│   └── views/
│       ├── __init__.py
│       ├── telemetry.py   # receive_data, start/stop recording
│       ├── launches.py    # list_launches, update_launch, delete_launch
│       ├── data.py        # get_graph_data
│       └── statistics.py  # get_bonus_data
└── services/
    ├── __init__.py
    └── statistics_service.py  # Flight statistics calculations
```

## API Endpoints

| URL | Method | Description |
|-----|--------|-------------|
| `/data/launches/` | GET | List all launches with status |
| `/data/launch/<id>/update/` | POST | Update launch name |
| `/data/launch/<id>/delete/` | DELETE | Delete launch |
| `/data/launch/<id>/start/` | POST | Start recording |
| `/data/launch/<id>/stop/` | POST | Stop recording (blocks all launches with same name) |
| `/data/read/` | POST | Receive telemetry data |
| `/data/start/` | POST | Create new launch |
| `/data/api/<id>/<field>/` | GET | Graph data (altitude, temperature, pressure, latitude, longitude) |
| `/data/api/<id>/bonus_datas/` | GET | Flight statistics |
| `/data/view/` | GET | Debug HTML page |

## Adding New Features

### New API endpoint:
1. Add view to `api/views/` (or create new file)
2. Add URL to `api/urls.py`

### New model:
1. Add to `models.py`
2. Run `python manage.py makemigrations` then `migrate`
3. Register in `admin.py`

### Business logic:
- Add to `services/` directory

## Key Patterns

### Constants (api/constants.py)
- `LIVE_THRESHOLD_SECONDS`: Time threshold for "live" status
- `ALLOWED_GRAPH_FIELDS`: Whitelist for graph queries
- `DEFAULT_LAUNCH_NAME_PREFIX`: Default name pattern

### Services (services/)
- Business logic separated from views
- `statistics_service.py`: Flight calculations (altitude, acceleration, speed, etc.)

### Stop Recording Behavior
When `/data/launch/<id>/stop/` is called, it stops recording for ALL launches with the same name (not just the specific ID).

## Dependencies

- Django==5.1.15
- asgiref==3.11.1
- sqlparse==0.5.5
- django-cors-headers==4.3.1

## Notes

- CORS enabled: `CORS_ALLOW_ALL_ORIGINS = True`
- Use logging, not print statements
- Keep views thin - move logic to services
- All APIs return JSON except `/data/view/` (HTML)
