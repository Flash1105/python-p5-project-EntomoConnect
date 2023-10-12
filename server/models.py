from datetime import datetime
from extensions import db
from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import  validates
import re

# Define models
class Observation(db.Model):
    __tablename__ = 'observation'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name="fk_observation_user"), nullable=True)

    @validates('title')
    def validate_title_type(self, key, title):
        assert isinstance(title, str), "Title must be a string"
        return title

    user = db.relationship("User", back_populates="observations")
    likes = db.relationship('Like', back_populates='observation')

# Define Discussion
class Discussion(db.Model):
    __tablename__ = 'discussion'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=True)
    observation_id = db.Column(db.Integer, ForeignKey('observation.id'), nullable=False)

    user = db.relationship("User", back_populates="discussions")

# Define User
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    # validate emails
    @validates('email')
    def validate_email_format(self, key, email):
        pattern = r"[^@]+@[^@]+\.[^@]+"
        assert re.match(pattern, email), "Invalid email format"
        return email

    # validate passwords
    @validates('password')
    def validate_password(self, key, password):
        assert len(password) >= 3, "Password must be at least 3 characters"
        return password

    observations = db.relationship('Observation', back_populates='user')
    discussions = db.relationship('Discussion', back_populates='user')
    likes = db.relationship('Like', back_populates='user')

# Define Like
class Like(db.Model):
    __tablename__ = 'like'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    observation_id = db.Column(db.Integer, db.ForeignKey('observation.id'), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    user = db.relationship('User', back_populates='likes')
    observation = db.relationship('Observation', back_populates='likes')

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'observation_id'),
        {}
    )

    def __repr__(self):
        return f'<Like by User {self.user_id} on Observation {self.observation_id}>'