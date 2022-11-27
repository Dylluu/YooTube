from flask import Blueprint, jsonify, session, request
from app.models import User, db, Comment
from app.forms import CommentForm
from flask_login import current_user, login_required

comments_routes = Blueprint('comments', __name__)

# @comments_routes.route('/<int:id>')
# def get_comments_for_video(id):
#     """Gets all comments by video_id"""
#     comments = Comment.query.filter_by(video_id = (id))
#     return {'comments': [comment.to_dict() for comment in comments]}

# @comments_routes.route('/<int:id>/new', methods=['POST'])
# @login_required
# def post_comment(id):
#     """Posts a comment for a video"""
#     form = CommentForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         currUserId = current_user.id
#         comment = Comment(
#             user_id=currUserId,
#             video_id=id,
#             comment=form.data['comment']
#         )
#         db.session.add(comment)
#         db.session.commit()
#         return comment.to_dict()
@comments_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    """Edits a comment"""
    data = request.get_json()
    comment = Comment.query.get(id)
    comment.comment = data['comment']
    db.session.commit()
    return comment.to_dict()

@comments_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """Deletes a comment"""
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return dict(message='Deleted comment')
