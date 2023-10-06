from datetime import datetime 
from extensions import db
from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import relationship

############


class Observation(db.Model):
    __tablename__ = 'observation'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", back_populates="observations", primaryjoin= lambda: User.id == Observation.user_id)
    likes = db.relationship('Like', back_populates='observation')

class Discussion(db.Model):
    __tablename__ = 'discussion'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    observation_id = db.Column(db.Integer, ForeignKey('observation.id'), nullable=False)
    user = db.relationship("User", back_populates="discussions", primaryjoin= lambda: User.id==Discussion.user_id)
    likes = db.relationship('Like', back_populates='discussion')

class User (db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)


    observations = relationship("Observation", back_populates="user")
    discussions = relationship("Discussion", back_populates="user")
    likes = db.relationship('Like', back_populates='user')

class Like (db.Model):
    __tablename__='like'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    discussion_id = db.Column(db.Integer, db.ForeignKey('discussion.id'), nullable=True)
    observation_id = db.Column(db.Integer, db.ForeignKey('observation.id'), nullable=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user = db.relationship('User', back_populates='likes')
    discussion = db.relationship('Discussion', back_populates='likes')
    observation = db.relationship('Observation', back_populates='likes')
    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'discussion_id', 'observation_id'),
        {}
    )

    def __repr__(self):
        return f'<User {self.id}>'