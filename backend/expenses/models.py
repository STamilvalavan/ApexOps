from django.db import models
from django.conf import settings
from django.utils import timezone

class Expense(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    category = models.CharField(max_length=100)

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    description = models.TextField(blank=True)

    date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.category} - {self.amount}"