"""
Launch management endpoints.
"""
import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone

from DATA_API.models import Data, Launch
from DATA_API.api.constants import LIVE_THRESHOLD_SECONDS


@csrf_exempt
def list_launches(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    launches = Launch.objects.all().order_by('-created_at')
    
    result = []
    for launch in launches:
        data_count = Data.objects.filter(launch=launch).count()
        last_data = Data.objects.filter(launch=launch).order_by('-created_at').first()
        
        is_live = False
        if last_data and last_data.created_at:
            time_diff = timezone.now() - last_data.created_at
            is_live = time_diff.total_seconds() < LIVE_THRESHOLD_SECONDS and launch.is_recording
        
        result.append({
            "id": launch.id,
            "name": launch.name,
            "created_at": launch.created_at.isoformat() if launch.created_at else None,
            "data_count": data_count,
            "is_recording": launch.is_recording,
            "live": is_live,
        })
    
    return JsonResponse({"launches": result}, safe=False)


@csrf_exempt
def update_launch(request, launch_id: int):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        data = json.loads(request.body)
        launch = Launch.objects.get(id=launch_id)
        launch.name = data.get("name", launch.name)
        launch.save()
        return JsonResponse({"message": "Launch updated", "name": launch.name})
    except Launch.DoesNotExist:
        return HttpResponseBadRequest("Launch not found")
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON")


@csrf_exempt
def delete_launch(request, launch_id: int):
    if request.method not in ("DELETE", "POST"):
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        launch = Launch.objects.get(id=launch_id)
        launch.delete()
        return JsonResponse({"message": "Launch deleted"})
    except Launch.DoesNotExist:
        return HttpResponseBadRequest("Launch not found")
