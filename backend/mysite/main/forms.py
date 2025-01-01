from django import forms
from .models import Review

class Review_Form(forms.ModelForm):
    class Meta:
        model = Review
        fields =['rating','comment']