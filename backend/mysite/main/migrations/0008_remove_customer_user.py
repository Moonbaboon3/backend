# Generated by Django 5.1.4 on 2025-01-31 18:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_customer_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='user',
        ),
    ]
