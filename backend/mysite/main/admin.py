from django.contrib import admin
from .models import Category, Customer, Product, Order, Product_details,Review, OrderItem
from django.core.exceptions import ValidationError

class OrderItem_Admin(admin.ModelAdmin):
    readonly_fields = ('price',) 

# Register your models here.
admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Product_details)
admin.site.register(Review)
admin.site.register(OrderItem, OrderItem_Admin)

