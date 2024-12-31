from django.contrib import admin
from .models import Category, Customer, Product, Order, Product_details
from django.core.exceptions import ValidationError

# Register your models here.
admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Product_details)

