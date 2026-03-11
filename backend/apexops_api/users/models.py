from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    bike_name = models.CharField(max_length=100, blank=True)
    bike_model = models.CharField(max_length=100, blank=True)
    engine_cc = models.PositiveIntegerField(default=0)
    average_mileage = models.FloatField(default=0.0)
    total_distance = models.PositiveIntegerField(default=0)
    
    last_oil_service = models.DateField(null=True, blank=True)
    last_oil_service_kms = models.PositiveIntegerField(default=0)
    last_oil_service_desc = models.TextField(blank=True)
    
    chain_lube = models.DateField(null=True, blank=True)
    chain_lube_kms = models.PositiveIntegerField(default=0)
    chain_lube_desc = models.TextField(blank=True)
    
    tyre_change = models.DateField(null=True, blank=True)
    tyre_change_kms = models.PositiveIntegerField(default=0)
    tyre_change_desc = models.TextField(blank=True)
    
    major_service = models.DateField(null=True, blank=True)
    major_service_kms = models.PositiveIntegerField(default=0)
    major_service_desc = models.TextField(blank=True)

    def __str__(self):
        return self.username