from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password')
    curtis = User(
        first_name='Curtis', last_name='Chung', username='cc', email='curtis@aa.io', password='password')
    nhut = User(
        first_name='Nhut-Linh', last_name='Ngo', username='NHUT', email='nhut@aa.io', password='password')
    david = User(
        first_name='David', last_name='Liaw', username='DLiaw', email='david@aa.io', password='password')
    jarrod = User(
        first_name='Jarrod', last_name='Mishima', username='Jarrod', email='jarrod@aa.io', password='password')

    db.session.add(demo)
    db.session.add(curtis)
    db.session.add(nhut)
    db.session.add(david)
    db.session.add(jarrod)
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
