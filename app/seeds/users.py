from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password')
    formula_1 = User(
        first_name='Formula', last_name='One', username='FORMULA 1', email='f1@aa.io', profile_pic='https://yt3.ggpht.com/PVF4vIcVEtapRrU5SnmbKwK4hTy7n6x_Sfas6ruR_62ZbF2sc5ydQQ0IBPTHvphxcgdBgMcuc_M=s176-c-k-c0x00ffffff-no-rj', password='password')
    gordon = User(
        first_name='Gordon', last_name='Ramsay', username='Gordon Ramsay', email='gordon@aa.io', profile_pic='https://yt3.ggpht.com/bFpwiiOB_NLCVsIcVQ9UcwBjb1RzipnMmtNfLSWpeIaHboyGkBCq4KBitmovRbStk9WvIWIZOyo=s176-c-k-c0x00ffffff-no-rj', password='password')
    rotten = User(
        first_name='Rotten', last_name='Tomatoes', username='Rotten Tomatoes Trailers', email='rottentomatoes@aa.io', profile_pic='https://yt3.ggpht.com/_XxIsLgks3G7PJ1Yhfq6GWBeDr2PfYIi9xrbz-7AnsaiutSh6pItq4odcQgXRAvCn1KuGqlj4g=s176-c-k-c0x00ffffff-no-rj', password='password')
    espn = User(
        first_name='ESPN', last_name='Sports', username='ESPN', email='espn@aa.io', profile_pic='https://yt3.ggpht.com/ytc/AMLnZu85lWboVPtYPEZESVzB-KeDb_CntR9GxPYBBdwn7f8=s176-c-k-c0x00ffffff-no-rj', password='password')
    drake = User(
        first_name='Aubrey', last_name='Graham', username='Drake', email='drake@aa.io', profile_pic='https://yt3.ggpht.com/ytc/AMLnZu8h3cs9KuwGOH9oNDl3tRyNO7-3yHUuaigEjBDqLg=s176-c-k-c0x00ffffff-no-rj', password='password')
    nfl = User(
        first_name='NFL', last_name='Official', username='NFL', email='nfl@aa.io', profile_pic='https://yt3.ggpht.com/ytc/AMLnZu8tOlovKPswBTvH6bT6UGVCwCsEZhxK2nJatGKKY9g=s176-c-k-c0x00ffffff-no-rj', password='password')
    avatar = User(
        first_name='Avatar', last_name='Official', username='Avatar', email='avatar@aa.io',
        profile_pic='https://yt3.ggpht.com/ytc/AMLnZu-qPHlOU8j2gApNMNDn0NPBxTZyrDovuamHV3jh_Q=s176-c-k-c0x00ffffff-no-rj', password='password'
    )
    mac = User(
        first_name='Mac', last_name='Miller', username='Mac Miller', email='macmiller@aa.io', profile_pic='https://yt3.ggpht.com/ytc/AMLnZu-MQWOf9ADAGTecKvv7TfWAH-qqKnMn6rHt5BQS1g=s176-c-k-c0x00ffffff-no-rj',
        password='password'
    )
    berrics = User(
        first_name='Berrics', last_name='Official', username='The Berrics', email='berrics@aa.io', profile_pic='https://yt3.ggpht.com/ytc/AMLnZu8XIsDmkPv10C8Z-ckFK2pXoul_RULZhxxyvoUVCg=s176-c-k-c0x00ffffff-no-rj', password='password'
    )
    warner = User(
        first_name='Warner', last_name='Bros', username='Warner Bros. Pictures', email='warner@aa.io', profile_pic='https://yt3.ggpht.com/Dd84-7pxMM5DvXGwsEoLv5NMdyeEJnGxhe0rtDuJslFN3YUKCOhN5R7n8--B6g33kPNV2Pv8Q28=s176-c-k-c0x00ffffff-no-rj', password='password'
    )

    db.session.add(demo)
    db.session.add(formula_1)
    db.session.add(gordon)
    db.session.add(rotten)
    db.session.add(espn)
    db.session.add(drake)
    db.session.add(nfl)
    db.session.add(avatar)
    db.session.add(mac)
    db.session.add(berrics)
    db.session.add(warner)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
