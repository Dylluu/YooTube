from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Video, UserLike, UserDislike, CommentLike, CommentDislike

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/likes/<int:videoId>')
@login_required
def get_user_likes(videoId):
    """Query for all likes made by user"""
    likes = UserLike.query.filter_by(user_id = (current_user.id), video_id = videoId)
    return {'user_likes': [like.to_dict() for like in likes]}

@user_routes.route('/dislikes/<int:videoId>')
@login_required
def get_user_dislikes(videoId):
    """Query for all dislikes made by user"""
    dislikes = UserDislike.query.filter_by(user_id = (current_user.id), video_id = videoId)
    return {'user_dislikes': [dislike.to_dict() for dislike in dislikes]}

@user_routes.route('/commentlikes')
@login_required
def get_user_comment_likes():
    """Query for user comment likes"""
    likes = CommentLike.query.filter_by(user_id = (current_user.id))
    return {'user_comment_likes': [like.to_dict() for like in likes]}

@user_routes.route('/commentdislikes')
@login_required
def get_user_comment_dislikes():
    """Query for user comment dislikes"""
    dislikes = CommentDislike.query.filter_by(user_id = (current_user.id))
    return {'user_comment_dislikes': [dislike.to_dict() for dislike in dislikes]}

@user_routes.route('/videos')
@login_required
def get_user_videos():
    """Gets all videos by current user"""
    videos = Video.query.filter_by(user_id = (current_user.id))
    return {'user_videos': [video.to_dict() for video in videos]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
