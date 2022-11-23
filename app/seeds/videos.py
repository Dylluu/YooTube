from app.models import db, Video, environment, SCHEMA

def seed_videos():
    first_video = Video(
        user_id=1, title='Steph Curry vs. Rockets Highlights', description='Steph goes off and hits nasty dagger', category='Sports', url='https://yootubetest.s3.amazonaws.com/Steph+Curry+Night+Night+Dagger!+33+PTS%2C15+AST%2C+7+REB%2C+7+THREES+Full+Highlights+vs+Rockets+%F0%9F%94%A5-XEUsUIFRjrs.mp4'
    )

    db.session.add(first_video)
    db.session.commit()

def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()
