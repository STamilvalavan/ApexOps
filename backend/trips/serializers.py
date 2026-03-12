from rest_framework import serializers
from .models import Trip

class TripSerializer(serializers.ModelSerializer):
    mileage = serializers.ReadOnlyField()

    class Meta:
        model = Trip
        fields = [
            'id',
            'start_location',
            'end_location',
            'total_kms',
            'petrol_expense',
            'liters_consumed',
            'mileage',
            'date'
        ]
