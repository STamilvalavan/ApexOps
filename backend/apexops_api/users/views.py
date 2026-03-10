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
        }

        return Response(data, status=status.HTTP_200_OK)