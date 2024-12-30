from django.contrib import admin
from .models import category,product

@admin.register(category)
class categoryAdmin(admin.ModelAdmin):
    list_display=('id','name')


@admin.register(product)
class ProductAdmin(admin.ModelAdmin):
    list_display=('id','name','description','price','category') 