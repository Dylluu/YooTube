from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(20), nullable=False)
    num_views = db.Column(db.Integer, default=0)
    num_likes = db.Column(db.Integer, default=0)
    url = db.Column(db.String(255), nullable=False)
    thumbnail = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='user_videos')
    comments = db.relationship('Comment', back_populates='video', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'num_views': self.num_views,
            'num_likes': self.num_likes,
            'url': self.url,
            'thumbnail': self.thumbnail,
            'comments': self.get_video_comments(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def get_video_comments(self):
        if self.comments:
            comments = [comment.to_dict() for comment in self.comments]
            return comments[::-1]
        else:
            return []
