from app import app
from extensions import db
from models import User, Observation, Discussion

def add_users():
    user1 = User(username='user1', email='user1', password='user1')
    user2 = User(username='user2', email='user2', password='user2')

    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()
    
def add_observations():
    observation1 = Observation(title='Beautiful Butterfly', content= 'Today, I spotted a Monarch Butterfly.')
    observation2= Observation(title='Orange Locus', content= 'Today, I spotted an Orange Locus.')
    db.session.add(observation1)
    db.session.commit()


def main():
    with app.app_context():
        db.create_all()
        add_users()
        add_observations()

if __name__=='__main__':
    main()
