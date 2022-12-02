from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not '@' in email or not '.' in email:
        raise ValidationError('Please enter a valid email address.')
    if user:
        raise ValidationError('Email address is already linked to an account.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired('Please enter your first name.'), Length(min=1, max=20, message='Please enter 20 characters or less.')])
    last_name = StringField(
        'last_name', validators=[DataRequired('Please enter your last name.'), Length(min=1, max=20, message='Please enter 20 characters or less.')])
    username = StringField(
        'username', validators=[DataRequired('Please enter a username.'), Length(min=1, max=30, message='Your username cannot be greater than 30 characters.'), username_exists])
    email = StringField('email', validators=[DataRequired('Please enter your email.'), Length(min=1, max=30, message='Your email cannot be greater than 30 characters.'), user_exists])
    password = StringField('password', validators=[Length(min=8, max=20, message='Your password must be between 8 and 20 characters.')])
