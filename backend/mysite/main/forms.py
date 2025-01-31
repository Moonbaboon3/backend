from django import forms
from .models import Review, OrderItem

class Review_Form(forms.ModelForm):
    class Meta:
        model = Review
        fields =['rating','comment']

class OrderItem_Form(forms.ModelForm):
    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'quantity']