from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def getnumgivestr(request, num):
    return Response({"message": f"Working! number was {num}"})