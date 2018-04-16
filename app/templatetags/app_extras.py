from django import template

register = template.Library()
#used to substract 2 value in template tags
@register.filter(name='subtract')
def subtract(value, arg):
    return value - arg
