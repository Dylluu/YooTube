from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Video

user_routes = Blueprint('users', __name__)

@user_routes.route('/videos')
@login_required
def get_user_videos():
    """Gets all videos by current user"""
    videos = Video.query.filter_by(user_id = (current_user.id))
    return {'user_videos': [video.to_dict() for video in videos]}


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
