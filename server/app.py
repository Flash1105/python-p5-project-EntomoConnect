from flask import Flask, request, jsonify, redirect
from config import Config
from flask_migrate import Migrate
from extensions import db
from models import User, Observation, Discussion
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_login import LoginManager, login_required, login_user, current_user

# Initialize flask
app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
bcrypt = Bcrypt(app)
CORS(app, RESOURCES={r"/api/*": {"origins": "*"}})
app.config.from_object(Config)
login_manager = LoginManager(app)

db.init_app(app)
migrate = Migrate(app, db)

# Load user
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Define homepage
@app.route('/')
def root():
    return 'Welcome to the EntomoConnect server'

# Define register
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

# Define login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json

    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'error': 'Incorrect username or password'}), 401

# Define logout
@app.route('/logout')
def logout():
    return redirect('/')

# Define create observation
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

# Define get observations
@app.route('/api/observations', methods=['GET'])
def get_observations():
    try:
        observations = Observation.query.all()
        observation_data = [{"id": observation.id, "title": observation.title, "content": observation.content} for observation in observations]
        return jsonify(observation_data)
    except Exception as e:
        print("Error getting observations", str(e))
        return jsonify({"error": "Server error while retrieving observations"}), 500

# Define get observation
@app.route('/api/observations/<int:id>', methods=['GET'])
def get_observation(id):
    observation = Observation.query.filter_by(id=id).first()
    if not observation:
        return jsonify({'error': 'Observation not found'}), 404
    return jsonify({
        'id': observation.id,
        'title': observation.title,
        'content': observation.content
        }), 200

# Define update observation
@app.route('/api/observations/<int:id>', methods=['PUT', 'PATCH'])

def update_observation(id):
    observation = Observation.query.get(id)

    if not observation:
        return jsonify({'error': 'Observation not found'}), 404
    
    data = request.json

    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    if 'title' in data and not data['title']:
        return jsonify({'error': 'Title is required'}), 400
    if 'content' in data and not data['content']:
        return jsonify({'error': 'Content cannot be empty'}), 400
    
    current_user_id = current_user.id  
    if observation.user_id != int(current_user_id):
        return jsonify({'error': 'You are not authorized to update this observation'}), 401
    
    if 'title' in data:
        observation.title = data['title']
    if 'content' in data:
        observation.content = data['content']

        try: 
            db.session.commit()
            return jsonify({
                'message': 'Observation updated successfully',
                'observation': {
                    'id': observation.id,
                    'title': observation.title,
                    'content': observation.content
                }
            }),
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'An error has occurred while updating the observation'}), 500


# Define delete observation
@app.route('/api/observations/<int:id>', methods=['DELETE'])

def delete_observation(id): 
    observation = Observation.query.get(id)

    if not observation:
        return jsonify({'error': 'Observation not found'}), 404
    
    db.session.delete(observation)
    db.session.commit()

    return jsonify({'message': 'Observation deleted successfully'}), 204

# Define create discussion
@app.route('/api/discussions', methods=['GET'])
def get_discussions():
    try:
        discussions = Discussion.query.all()
        discussion_data = [{"id": discussion.id, "content": discussion.content} for discussion in discussions]
        return jsonify(discussion_data)
    except Exception as e:
        print("Error getting discussions", str(e))
        return jsonify({"error": "Server error while retrieving discussions"}), 500

# Define create discussion
@app.route('/api/discussions', methods=['POST'])

def create_discussion():
    data = request.json
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    content = data.get('content')

    if not content:
        return jsonify({'error': 'Content is required'}), 400

    latest_observation = Observation.query.order_by(Observation.id.desc()).first()

    if latest_observation:
        observation_id = latest_observation.id
    else:
        return jsonify({'error': 'No observations found. Create the first observation'}), 400

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