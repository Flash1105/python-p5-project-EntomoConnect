from flask_sqlalchemy import SQLAlchemy
from datetime import datetime 
from extensions import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

############


class Observation(db.Model):
    __tablename__ = 'observations'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="observations")

class Discussion(db.Model):
    __tablename__ = 'discussions'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    observation_id = db.Column(db.Integer, ForeignKey('observations.id'), nullable=False)
    user = db.relationship("User", back_populates="discussions")

class User (db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    observations = relationship("Observation", back_populates="user")
    discussions = relationship("Discussion", back_populates="user")


    def __repr__(self):
        return f'<User {self.username}>'