from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Customer
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_customerProfile(sender, instance, created, **kwargs):
    if created:
        Customer.objects.create(user=instance)

