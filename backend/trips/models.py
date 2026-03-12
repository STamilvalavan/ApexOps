from django.db import models
from django.conf import settings
from django.utils import timezone

class Trip(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    start_location = models.CharField(max_length=255)
    end_location = models.CharField(max_length=255)
    total_kms = models.FloatField()
    petrol_expense = models.DecimalField(max_digits=10, decimal_places=2)
    liters_consumed = models.FloatField()
    date = models.DateField(default=timezone.now)

    @property
    def mileage(self):
        if self.liters_consumed > 0:
            return round(self.total_kms / self.liters_consumed, 2)
        return 0

    def __str__(self):
        return f"{self.start_location} to {self.end_location} - {self.total_kms} km"
