from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Comment

class CommentForm(FlaskForm):
    comment = StringField(
        'comment', validators=[Length(min=1, max=255, message='Comment must be between 1 and 255 characters.')]
    )
