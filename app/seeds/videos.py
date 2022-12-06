from app.models import db, Video, environment, SCHEMA

def seed_videos():
    first_video = Video(
        user_id=1, title='Warriors vs. Rockets Steph Curry Highlights', description='Steph goes off and hits nasty dagger', category='Sports', url='https://yootubetest.s3.amazonaws.com/Steph+Curry+Night+Night+Dagger!+33+PTS%2C15+AST%2C+7+REB%2C+7+THREES+Full+Highlights+vs+Rockets+%F0%9F%94%A5-XEUsUIFRjrs.mp4', thumbnail='https://i3.ytimg.com/vi/XEUsUIFRjrs/maxresdefault.jpg'
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

    drake = Video(
        user_id=6, title='Drake - Headlines (Explicit)', description='Music video by Drake performing Headlines. (C) 2011 Cash Money Records Inc.', category='Music', url='https://yootubetest.s3.amazonaws.com/Drake+-+Headlines+(Explicit)-cimoNqiulUE.mp4', thumbnail='https://i3.ytimg.com/vi/cimoNqiulUE/maxresdefault.jpg'
    )

    chiefs = Video(
        user_id=7, title='Los Angeles Rams vs. Kansas City Chiefs Preview', description='The 8-2 Chiefs take on the 3-7 Rams at home. Tune in for an exciting Sunday Night Football matchup!', category='Sports', url='https://yootubetest.s3.amazonaws.com/Los+Angeles+Rams+vs.+Kansas+City+Chiefs+_+2022+Week+12+Game+Preview-mVJRzOFC0oE.mp4', thumbnail='https://i3.ytimg.com/vi/mVJRzOFC0oE/maxresdefault.jpg'
    )
    avatar = Video(
        user_id=8, title='Avatar: The Way of Water | Official Trailer', description='Directed by James Cameron and produced by Cameron and Jon Landau. Screenplay by James Cameron & Rick Jaffa & Amanda Silver.', category='Movies', url='https://yootubetest.s3.amazonaws.com/Avatar+-+The+Way+of+Water+_+Official+Trailer-d9MyW72ELq0.mp4', thumbnail='https://i3.ytimg.com/vi/d9MyW72ELq0/maxresdefault.jpg'
    )
    best_day = Video(
        user_id=9, title='Best Day Ever', description='Best Day Ever ℗ 2016 Rostrum Records, LLC', category='Music', url='https://yootubetest.s3.amazonaws.com/Mac+Miller+-+Best+Day+Ever-AbV-Q6tz4B8.mp4', thumbnail='https://i3.ytimg.com/vi/vykXjvO0xMk/maxresdefault.jpg'
    )
    batb = Video(
        user_id=10, title='Nyjah Huston Vs Mike Mo Capaldi: BATB7', description='Nyjah Huston and Mike Mo Capaldi battle it out in a game of S.K.A.T.E. during the second round of Battle at The Berrics 7 - Pros vs Joes.', category='Sports', url='https://yootubetest.s3.amazonaws.com/Nyjah+Huston+Vs+Mike+Mo+Capaldi+-+BATB7+-+Round+2-qNP76LyJGhA.mp4', thumbnail='https://i3.ytimg.com/vi/XzkEgqp_agI/maxresdefault.jpg'
    )
    kong = Video(
        user_id=11, title='Godzilla vs. Kong - Official Trailer', description='In theaters and streaming exclusively on @HBOMax* March 26.', category='Movies', url='https://yootubetest.s3.amazonaws.com/Godzilla+vs.+Kong+%E2%80%93+Official+Trailer-odM92ap8_c0.mp4', thumbnail='https://i3.ytimg.com/vi/odM92ap8_c0/maxresdefault.jpg'
    )
    baby_driver = Video(
        user_id=4, title='Baby Driver Opening Scene (2017)', description='Baby Driver Opening Scene (2017): Check out the new clip starring Ansel Elgort, Jon Hamm, and Eiza González! Be the first to watch, comment, and share clips and behind the scenes dropping @MovieclipsComingSoon.', category='Movies', url='https://yootubetest.s3.amazonaws.com/Baby+Driver+Opening+Scene+(2017)+_+Movieclips+Coming+Soon-7ARFyrM6gVs.mp4', thumbnail='https://i3.ytimg.com/vi/7ARFyrM6gVs/maxresdefault.jpg'
    )
    kyrie = Video(
        user_id=5, title='Nets vs. Raptors Highlights | 2022 Season', description='The Nets take on the Raptors. TJ Warren has his debut as a Brooklyn Net.', category='Sports', url='https://yootubetest.s3.amazonaws.com/TJ+Warren+Nets+Debut!+Kyrie+Irving+27+Pts+vs+Raptors!+2022-23+NBA+Season-YOhAFAuBl3U.mp4', thumbnail='https://i3.ytimg.com/vi/YOhAFAuBl3U/maxresdefault.jpg'
    )


    db.session.add(first_video)
    db.session.add(burger)
    db.session.add(monaco_gp)
    db.session.add(best_day)
    db.session.add(wiggins)
    db.session.add(chiefs)
    db.session.add(batb)
    db.session.add(kong)
    db.session.add(baby_driver)
    db.session.add(drake)
    db.session.add(sushi)
    db.session.add(avatar)
    db.session.add(kyrie)
    db.session.commit()

def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()
