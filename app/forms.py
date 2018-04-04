from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User


class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(max_length=100, label="", widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Enter Username'
    }))
    password = forms.CharField(max_length=100, label="", widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Enter Username'
    }))


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['class'] = 'form-control'
