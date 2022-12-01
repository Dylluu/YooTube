from flask import Blueprint, jsonify, session, request
from app.models import Video, Comment, db
from app.forms import CommentForm, VideoForm
from flask_login import current_user, login_required
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename
)

video_routes = Blueprint('videos', __name__)

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


@video_routes.route('/<int:id>/comments')
def get_comments_for_video(id):
    """Gets all comments by video_id"""
    comments = Comment.query.filter_by(video_id = (id))
    return {'comments': [comment.to_dict() for comment in comments]}


@video_routes.route('/<int:id>')
def get_one_video(id):
    """Query for one video"""
    video = Video.query.get(id)
    return video.to_dict()

@video_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_video(id):
    """Edits a video"""
    data = request.get_json()
    video = Video.query.get(id)
    video.title = data['title']
    video.description = data['description']
    video.thumbnail = data['thumbnail']
    db.session.commit()
    return video.to_dict()

@video_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_video(id):
    """Delete video by id"""
    video = Video.query.get(id)
    db.session.delete(video)
    db.session.commit()
    return dict(mesage='Deleted video')

@video_routes.route('/')
def videos():
    """Query for all videos"""
    videos = Video.query.all()
    return {'videos': [video.to_dict() for video in videos]}

@video_routes.route('', methods=['POST'])
@login_required
def upload_video():
    if "video" not in request.files:
        return {"errors": "video required"}, 400

    video = request.files["video"]

    if not allowed_file(video.filename):
        return {"errors": "file type not permitted"}, 400

    video.filename = get_unique_filename(video.filename)

    upload = upload_file_to_s3(video)
    # print(upload, '00000000')

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    # form = VideoForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if from.validate_on_submit():
    data = request.form
    url = upload["url"]

        # flask_login allows us to get the current user from the request
    new_video = Video(
        user_id=current_user.id,
        title = data['title'],
        description = data['description'],
        category= 'Video',
        url=url,
        thumbnail = data['thumbnail']
        )
    db.session.add(new_video)
    db.session.commit()
    return {"url": url}
