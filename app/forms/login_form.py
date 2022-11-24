from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Couldn't find your Doogle Account")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Couldn't find your Doogle Account")
    if not user.check_password(password):
        raise ValidationError("Couldn't login with provided credentials")


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired('Please enter an email and a password'), user_exists])
    password = StringField('password', validators=[
                           DataRequired('Please enter an email and a password'), password_matches])
