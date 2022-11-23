from flask import Blueprint, jsonify
from app.models import Video

video_routes = Blueprint('videos', __name__)

@video_routes.route('/')
def videos():
    """Query for all videos"""
    videos = Video.query.all()
    return {'videos': [video.to_dict() for video in videos]}
