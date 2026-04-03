"""
Statistics endpoints.
"""
from django.http import JsonResponse
from DATA_API.models import Data
from DATA_API.services.statistics_service import calculate_statistics


def get_bonus_data(request, launch_id: int):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    data_list = Data.objects.filter(launch_id=launch_id).order_by('time')
    data = list(data_list.values())
    
    if not data:
        return JsonResponse({"error": "No data for this launch"}, status=404)
    
    try:
        stats = calculate_statistics(data)
        result = dict(stats)
        result["launch_id"] = launch_id
        return JsonResponse(result)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=404)
