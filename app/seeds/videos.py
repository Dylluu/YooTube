from app.models import db, Video, environment, SCHEMA

def seed_videos():
    first_video = Video(
        user_id=1, title='Steph Curry vs. Rockets Highlights', description='Steph goes off and hits nasty dagger', category='Sports', url='https://yootubetest.s3.amazonaws.com/Steph+Curry+Night+Night+Dagger!+33+PTS%2C15+AST%2C+7+REB%2C+7+THREES+Full+Highlights+vs+Rockets+%F0%9F%94%A5-XEUsUIFRjrs.mp4', thumbnail='https://i3.ytimg.com/vi/XEUsUIFRjrs/maxresdefault.jpg'
    )

    monaco_gp = Video(
        user_id=2, title='Race Highlights | 2022 Monaco Grand Prix', description='Rain fell in Monaco and the drama followed! As the drivers battled to the chequered flag on the slippy streets of Monte Carlo', category='Cars', url='https://yootubetest.s3.amazonaws.com/Race+Highlights+_+2022+Monaco+Grand+Prix-sp_ntF4GmSE.mp4', thumbnail='https://i3.ytimg.com/vi/sp_ntF4GmSE/maxresdefault.jpg'
    )

    burger = Video(
        user_id=3, title='Gordon Ramsay Makes an All American Burger', description='Gordon is cooking up the perfect burger for the 4th of July! Even at the home, you can make the perfect burger!', category='Food', url='https://yootubetest.s3.amazonaws.com/Gordon+Ramsay+Makes+an+All+American+Burger-ulhRORJpuBM.mp4', thumbnail='https://i3.ytimg.com/vi/ulhRORJpuBM/maxresdefault.jpg'
    )

    sushi = Video(
        user_id=4, title='Jiro Dreams of Sushi Official Trailer #1', description='Jiro Dreams of Sushi Official Trailer #1 - Jiro Ono Documentary (2012) HD', category='Food', url='https://yootubetest.s3.amazonaws.com/Jiro+Dreams+of+Sushi+Official+Trailer+%231+-+Jiro+Ono+Documentary+(2012)+HD-M-aGPniFvS0.mp4', thumbnail='https://i3.ytimg.com/vi/M-aGPniFvS0/maxresdefault.jpg'
    )

    wiggins = Video(
        user_id=5, title='Warriors vs. Clippers Highlights | Wiggins 31 Pts', description='The Warriors take on the Clippers at home and Wiggins goes for a season high 31 points with 6 threes.', category='Sports', url='https://yootubetest.s3.amazonaws.com/Andrew+Wiggins+31+Pts+6+3s+Season+High+vs+Clippers!+2022-23+NBA+Season-_FY-wWtzwF0.mp4', thumbnail='https://i3.ytimg.com/vi/_FY-wWtzwF0/maxresdefault.jpg'
    )

    db.session.add(first_video)
    db.session.add(monaco_gp)
    db.session.add(burger)
    db.session.add(sushi)
    db.session.add(wiggins)
    db.session.commit()

def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()
