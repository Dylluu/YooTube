from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    first = Comment(
        video_id=1, user_id=6, comment='Look at Curry man'
    )
    second = Comment(
        video_id=1, user_id=6, comment='So inspirational'
    )
    third = Comment(
        video_id=2, user_id=1, comment='What a great race'
    )
    fourth = Comment(
        video_id=3, user_id=1, comment='That looks bomb'
    )
    fifth = Comment(
        video_id=4, user_id=1, comment='First'
    )
    sixth = Comment(
        video_id=5, user_id=5, comment='GOAT'
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(sixth)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
