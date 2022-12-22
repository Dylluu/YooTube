from .db import db, environment, SCHEMA, add_prefix_for_prod

class CommentLike(db.Model):
    __tablename__ = 'commentlikes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')), nullable=False)

    # user = db.relationship('User', back_populates='user_likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'comment_id': self.comment_id
        }
