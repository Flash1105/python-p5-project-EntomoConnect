from app import app
from extensions import db
from models import User, Observation, Discussion

def add_users():

    pass
def add_observations():
    observation1 = Observation(title='Beautiful Butterfly', content= 'Today, I spotted a Monarch Butterfly.')
    db.session.add(observation1)
    db.session.commit()


def main():
    with app.app_context():
        db.create_all()
        add_users()
        add_observations()

if __name__=='__main__':
    main()
