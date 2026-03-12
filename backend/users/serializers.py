from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "bike_name",
            "bike_model",
            "engine_cc",
            "average_mileage",
            "total_distance",
            "last_oil_service",
            "last_oil_service_kms",
            "last_oil_service_desc",
            "chain_lube",
            "chain_lube_kms",
            "chain_lube_desc",
            "tyre_change",
            "tyre_change_kms",
            "tyre_change_desc",
            "major_service",
            "major_service_kms",
            "major_service_desc"
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):

        user = User.objects.create_user(**validated_data)
        return user