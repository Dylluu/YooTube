from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Video

class VideoForm(FlaskForm):
    title = StringField('title', validators=[Length(min=1, max=50, message='Title must be between 1 and 50 characters.')])
    description = StringField('description', validators=[Length(min=1, max=255, message='Description must be between 1 and 255 characters.')])
    category = StringField('category', nullable=False)
    thumbnail = StringField('thumbnail', validators=[Length(min=1, max=255, message='Thumbnail must be between 1 and 255 characters.')])
