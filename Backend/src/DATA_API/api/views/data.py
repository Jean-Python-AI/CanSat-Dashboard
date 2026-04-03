"""
Graph data endpoints.
"""
from django.http import JsonResponse
from DATA_API.models import Data
from DATA_API.api.constants import ALLOWED_GRAPH_FIELDS


def get_graph_data(request, launch_id: int, field: str):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    if field not in ALLOWED_GRAPH_FIELDS:
        return JsonResponse({"error": f"Invalid field. Allowed: {ALLOWED_GRAPH_FIELDS}"}, status=400)
    
    rows = Data.objects.filter(launch_id=launch_id).order_by("time")
    
    times = [row.time for row in rows]
    values = [getattr(row, field) for row in rows]
    
    return JsonResponse({"time": times, "data": values})
