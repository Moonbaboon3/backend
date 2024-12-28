from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_view, name='home'),
    path('products/',views.products_view,name='products' ) 
]