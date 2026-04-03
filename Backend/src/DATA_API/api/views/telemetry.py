"""
Telemetry data ingestion endpoints.
"""
import datetime
import json
import logging
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

from DATA_API.models import Data, Launch
from DATA_API.api.constants import DEFAULT_LAUNCH_NAME_PREFIX

logger = logging.getLogger(__name__)


@csrf_exempt
def receive_data(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        data = json.loads(request.body)
        logger.debug(f"Received data: {data}")
        
        launch_id = data.get("launch_id")
        launch_name = data.get("launch_name")
        launch = None
        
        if launch_id:
            try:
                launch = Launch.objects.get(id=launch_id)
            except Launch.DoesNotExist:
                launch = None
        
        if not launch and launch_name:
            # Check if ANY launch with this name has recording stopped
            stopped_launches = Launch.objects.filter(name=launch_name, is_recording=False)
            if stopped_launches.exists():
                return JsonResponse({
                    "error": f"Recording stopped for launch '{launch_name}'",
                    "recording": False
                }, status=200)
            launch, _ = Launch.objects.get_or_create(name=launch_name)
        
        if not launch:
            launch_name = launch_name or f"{DEFAULT_LAUNCH_NAME_PREFIX} {Launch.objects.count() + 1}"
            launch = Launch.objects.create(name=launch_name)
        
        if not launch.is_recording:
            # Check if any launch with same name is stopped
            if launch_name:
                stopped = Launch.objects.filter(name=launch_name, is_recording=False).exists()
                if stopped:
                    return JsonResponse({
                        "error": f"Recording stopped for launch '{launch_name}'",
                        "recording": False
                    }, status=200)
        
        Data.objects.create(
            launch=launch,
            time=data.get("time"),
            altitude=data.get("altitude"),
            temperature=data.get("temperature"),
            pressure=data.get("pressure"),
            latitude=data.get("latitude"),
            longitude=data.get("longitude"),
        )
        
        return JsonResponse({"message": "Data received"}, status=200)
        
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        return HttpResponseBadRequest(f"Invalid JSON: {e}")
    except Exception as e:
        logger.exception(f"Error processing data: {e}")
        return HttpResponseBadRequest(f"Error: {e}")


@csrf_exempt
def start_new_recording(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        data = json.loads(request.body)
        launch_id = data.get("launch_id")
        
        if launch_id:
            try:
                launch = Launch.objects.get(id=launch_id)
                Data.objects.filter(launch=launch).delete()
                return JsonResponse({
                    "message": "Old data cleared",
                    "launch_id": launch.id,
                    "launch_name": launch.name
                }, status=200)
            except Launch.DoesNotExist:
                return HttpResponseBadRequest("Launch not found")
        
        launch_name = data.get("name", f"{DEFAULT_LAUNCH_NAME_PREFIX} {Launch.objects.count() + 1}")
        launch = Launch.objects.create(name=launch_name)
        
        return JsonResponse({
            "message": "New recording session started",
            "launch_id": launch.id,
            "launch_name": launch.name
        }, status=201)
        
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON")


@csrf_exempt
def stop_recording(request, launch_id: int):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        launch = Launch.objects.get(id=launch_id)
        launch_name = launch.name
        
        # Stop ALL launches with the same name
        Launch.objects.filter(name=launch_name).update(is_recording=False)
        
        return JsonResponse({
            "message": f"Recording stopped for all launches named '{launch_name}'",
            "launch_name": launch_name,
            "is_recording": False
        })
    except Launch.DoesNotExist:
        return HttpResponseBadRequest("Launch not found")


@csrf_exempt
def start_recording(request, launch_id: int):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        launch = Launch.objects.get(id=launch_id)
        launch.is_recording = True
        launch.save()
        return JsonResponse({"message": "Recording started", "is_recording": True})
    except Launch.DoesNotExist:
        return HttpResponseBadRequest("Launch not found")
