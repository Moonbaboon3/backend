from django.urls import path
from . import views

urlpatterns = [

    path('', views.index_view, name='home'),
    path('category/<int:category_id>/',views.products_view,name='products' ),
    path('products/cart/', views.view_cart, name='cart'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.view_cart, name='view_cart'),
    path('get-cart/', views.get_cart, name='get_cart'),
    path('checkout/', views.visa_view, name='checkout'),
    path('signup/', views.signup_view, name='signup'),
    path('myorders/', views.myorders_view, name='myorders'),
    path('cancel_order/<int:order_ID>/', views.cancel_order, name='cancel_order'),
    path('account/', views.account_view, name='account'),
    path('login/', views.login_view, name='login'),
    path('category/<int:category_id>/product/<int:product_id>/', views.productDetail_view, name='product_detail'),
    path('review/delete/<int:review_id>/', views.delete_review, name='delete_review'),
    path('ajax-search/', views.ajax_search_products, name='ajax_search_products'),
] 