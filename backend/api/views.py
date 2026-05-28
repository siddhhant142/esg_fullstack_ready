from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import EmissionRecord
from .serializers import EmissionRecordSerializer

@api_view(["GET"])
def get_records(request):
    records = EmissionRecord.objects.all()
    serializer = EmissionRecordSerializer(records, many=True)
    return Response(serializer.data)
