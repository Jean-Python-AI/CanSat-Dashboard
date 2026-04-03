"""
API URL routing.
"""
from django.urls import path
from DATA_API.api.views import telemetry, launches, data, statistics

urlpatterns = [
    path("read/", telemetry.receive_data, name="telemetry_receive"),
    path("start/", telemetry.start_new_recording, name="telemetry_start"),
    
    path("launches/", launches.list_launches, name="launch_list"),
    path("launch/<int:launch_id>/update/", launches.update_launch, name="launch_update"),
    path("launch/<int:launch_id>/delete/", launches.delete_launch, name="launch_delete"),
    path("launch/<int:launch_id>/stop/", telemetry.stop_recording, name="telemetry_stop"),
    path("launch/<int:launch_id>/start/", telemetry.start_recording, name="telemetry_start_recording"),
    
    path("api/<int:launch_id>/bonus_datas/", statistics.get_bonus_data, name="data_bonus"),
    path("api/<int:launch_id>/<str:field>/", data.get_graph_data, name="data_graph"),
]
