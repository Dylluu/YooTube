from flask import Blueprint, jsonify, session, request
from app.models import User, db, Comment
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_required

comments_routes = Blueprint('comments', __name__)

@comments_routes.route('/<int:id>')
def get_comments_for_video(id):
    """Gets all comments by video_id"""
    comments = Comment.query.filter_by(video_id = (id))
    return {'comments': [comment.to_dict() for comment in comments]}
