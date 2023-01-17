from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class History(db.Model):
    __tablename__ = 'history'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    video_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'video_id': self.video_id
        }
