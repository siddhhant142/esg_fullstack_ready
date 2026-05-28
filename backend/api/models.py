from django.db import models

class EmissionRecord(models.Model):
    activity = models.CharField(max_length=255)
    scope = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=50)
    co2e = models.FloatField()
    suspicious = models.BooleanField(default=False)
    status = models.CharField(max_length=50, default="PENDING")
