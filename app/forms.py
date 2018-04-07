from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator, MinLengthValidator

from app.models import Profile


class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(max_length=100, label="", widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Enter Username'
    }))
    password = forms.CharField(max_length=100, label="", widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Enter Username'
    }))


class topicCreateForm(forms.Form):
    topicName = forms.CharField(label="Topic Name", max_length=80, required=True,
                                validators=[MaxLengthValidator(80), MinLengthValidator(0)],
                                widget=forms.TextInput(attrs={
                                    'class': 'form-control',
                                    'placeholder': 'Name your topic'
                                }))
    description = forms.CharField(label='Description', max_length=300,
                                  required=True, validators=[MaxLengthValidator(300), MinLengthValidator(0)],
                                  widget=forms.Textarea(attrs={
                                      'class': 'form-control',
                                      'placeholder': 'Describe here what others should post on this topic...'
                                  }))
    rules = forms.CharField(label='Rules (Optional)', max_length=300,
                            validators=[MaxLengthValidator(500)],
                            widget=forms.Textarea(attrs={
                                'class': 'form-control',
                                'placeholder': 'Describe here the rules the users must obey on order to post in this topic...'
                            }))


class CommentOnPost(forms.Form):
    comment = forms.CharField(max_length=10000, label="", widget=forms.Textarea(attrs={
        'class': 'form-control',
        'rows': 5,
        'placeholder': 'Write your comment here!'
    }))


class CreatePost(forms.Form):
    title = forms.CharField(label="Title", max_length=80, required=True,
                            validators=[MaxLengthValidator(120), MinLengthValidator(0)],
                            widget=forms.TextInput(attrs={
                                'class': 'form-control',
                                'placeholder': 'Short description of your Post...'
                            }))
    content = forms.CharField(label='Text', max_length=300,
                              required=True, validators=[MaxLengthValidator(100000), MinLengthValidator(0)],
                              widget=forms.Textarea(attrs={
                                  'class': 'form-control',
                                  'placeholder': 'Your post...'
                              }))


class SignUpForm(UserCreationForm):
    birth_date = forms.DateField(required=False)

    class Meta:
        model = User
        fields = {'username', 'email', 'password1', 'password2', 'first_name', 'last_name'}