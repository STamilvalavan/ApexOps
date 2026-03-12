from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import RegisterSerializer


# -----------------------------
# Register API
# -----------------------------
class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# -----------------------------
# Login API (JWT)
# -----------------------------
class LoginView(TokenObtainPairView):
    """
    Returns JWT access and refresh tokens
    """
    pass


# -----------------------------
# Profile API
# -----------------------------
class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "bike_name": user.bike_name,
            "bike_model": user.bike_model,
            "engine_cc": user.engine_cc,
            "average_mileage": user.average_mileage,
            "total_distance": user.total_distance,
            "last_oil_service": user.last_oil_service,
            "last_oil_service_kms": user.last_oil_service_kms,
            "last_oil_service_desc": user.last_oil_service_desc,
            "chain_lube": user.chain_lube,
            "chain_lube_kms": user.chain_lube_kms,
            "chain_lube_desc": user.chain_lube_desc,
            "tyre_change": user.tyre_change,
            "tyre_change_kms": user.tyre_change_kms,
            "tyre_change_desc": user.tyre_change_desc,
            "major_service": user.major_service,
            "major_service_kms": user.major_service_kms,
            "major_service_desc": user.major_service_desc,
        }

        return Response(data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        data = request.data

        user.bike_name = data.get("bike_name", user.bike_name)
        user.bike_model = data.get("bike_model", user.bike_model)
        user.engine_cc = data.get("engine_cc", user.engine_cc)
        user.average_mileage = data.get("average_mileage", user.average_mileage)
        user.total_distance = data.get("total_distance", user.total_distance)
        
        user.last_oil_service = data.get("last_oil_service", user.last_oil_service)
        user.last_oil_service_kms = data.get("last_oil_service_kms", user.last_oil_service_kms)
        user.last_oil_service_desc = data.get("last_oil_service_desc", user.last_oil_service_desc)
        
        user.chain_lube = data.get("chain_lube", user.chain_lube)
        user.chain_lube_kms = data.get("chain_lube_kms", user.chain_lube_kms)
        user.chain_lube_desc = data.get("chain_lube_desc", user.chain_lube_desc)
        
        user.tyre_change = data.get("tyre_change", user.tyre_change)
        user.tyre_change_kms = data.get("tyre_change_kms", user.tyre_change_kms)
        user.tyre_change_desc = data.get("tyre_change_desc", user.tyre_change_desc)
        
        user.major_service = data.get("major_service", user.major_service)
        user.major_service_kms = data.get("major_service_kms", user.major_service_kms)
        user.major_service_desc = data.get("major_service_desc", user.major_service_desc)
        
        user.save()

        return Response({
            "message": "Profile updated successfully",
            "bike_name": user.bike_name,
            "bike_model": user.bike_model,
            "engine_cc": user.engine_cc,
            "average_mileage": user.average_mileage,
            "total_distance": user.total_distance,
            "last_oil_service": user.last_oil_service,
            "last_oil_service_kms": user.last_oil_service_kms,
            "last_oil_service_desc": user.last_oil_service_desc,
            "chain_lube": user.chain_lube,
            "chain_lube_kms": user.chain_lube_kms,
            "chain_lube_desc": user.chain_lube_desc,
            "tyre_change": user.tyre_change,
            "tyre_change_kms": user.tyre_change_kms,
            "tyre_change_desc": user.tyre_change_desc,
            "major_service": user.major_service,
            "major_service_kms": user.major_service_kms,
            "major_service_desc": user.major_service_desc,
        }, status=status.HTTP_200_OK)