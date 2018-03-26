from django import forms


class GeneralSearch(forms.Form):
    searchString = forms.CharField(max_length=100, label="", widget=forms.TextInput(attrs={
        'class': 'form-control',
        'type': 'text',
        'placeholder': 'Search for...'
    }))
