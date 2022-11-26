from flask import Blueprint, jsonify, session, request
from app.models import Video, Comment, db
from app.forms import CommentForm
from flask_login import current_user, login_required

video_routes = Blueprint('videos', __name__)

@video_routes.route('/')
def videos():
    """Query for all videos"""
    videos = Video.query.all()
    return {'videos': [video.to_dict() for video in videos]}

@video_routes.route('/<int:id>/comments')
def get_comments_for_video(id):
    """Gets all comments by video_id"""
    comments = Comment.query.filter_by(video_id = (id))
    return {'comments': [comment.to_dict() for comment in comments]}

@video_routes.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def post_comment(id):
    """Posts a comment for a video"""
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        currUserId = current_user.id
        comment = Comment(
            user_id=currUserId,
            video_id=id,
            comment=form.data['comment']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
