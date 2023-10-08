from flask import Flask, request, jsonify, redirect
from config import Config
from flask_migrate import Migrate
from extensions import db
from models import User, Observation, Discussion
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
bcrypt = Bcrypt(app)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def root():
    return 'Welcome to the EntomoConnect server'

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json 

    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    if existing_email:
        return jsonify({'error': 'Email already exists'}), 400
    
    new_user = User(username=username, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json

    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'error': 'Incorrect username or password'}), 401

@app.route('/logout')
def logout():
    return redirect('/')

@app.route('/api/observations', methods=['POST'])
def create_observation():
    data = request.json
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    new_observation = Observation(title=title, content=content)
    db.session.add(new_observation)
    db.session.commit()

    return jsonify({'message': 'Observation created successfully', 'observation': {
        'id': new_observation.id,
        'title': new_observation.title,
        'content': new_observation.content
    }}), 201

@app.route('/api/observations', methods=['GET'])
def get_observations():
    try:
        observations = Observation.query.all()
        observation_data = [{"id": observation.id, "title": observation.title, "content": observation.content} for observation in observations]
        return jsonify(observation_data)
    except Exception as e:
        print("Error getting observations", str(e))
        return jsonify({"error": "Server error while retrieving observations"}), 500

@app.route('/api/observations/<int:id>', methods=['PUT', 'PATCH'])
def update_observation(id):
    data = request.json
    observation = Observation.query.get(id)

    if not observation:
        return jsonify({'error': 'Observation not found'}), 404
    
    if 'title' in data: 
        observation.title = data['title']
    if 'content' in data:  
        observation.content = data['content']

    db.session.commit()

    return jsonify({'message': 'Observation updated successfully', 'observation': {
        'id': observation.id,
        'title': observation.title,
        'content': observation.content
    }}), 200

@app.route('/api/observations/<int:id>', methods=['DELETE'])
def delete_observation(id): 
    observation = Observation.query.get(id)

    if not observation:
        return jsonify({'error': 'Observation not found'}), 404
    
    db.session.delete(observation)
    db.session.commit()

    return jsonify({'message': 'Observation deleted successfully'}), 204

@app.route('/api/discussions', methods=['GET'])
def get_discussions():
    discussions = Discussion.query.all()
    discussion_data = [{"id": discussion.id, "content": discussion.content} for discussion in discussions]
    return jsonify(discussion_data)

@app.route('/api/discussions', methods=['POST'])
def create_discussion():
    data = request.json
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    content = data.get('content')
    if not content:
        return jsonify({'error': 'Content is required'}), 400

    observation_id = data.get('observation_id', None)  
    new_discussion = Discussion(content=content, observation_id=observation_id)
    
    db.session.add(new_discussion)
    db.session.commit()

    return jsonify({'message': 'Discussion created successfully', 'discussion': {
        'id': new_discussion.id,
        'content': new_discussion.content,
        'observation_id': new_discussion.observation_id
    }}), 201


if __name__ == '__main__':
    app.run(port=5555, debug=True)
