from flask import Flask, request, jsonify
from config import Config
from flask_migrate import Migrate
from extensions import db
from models import User
from flask_cors import CORS
from flask_bcrypt import Bcrypt

#########################

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.debug = True
bcrypt = Bcrypt(app)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def catch_all(path):    
    return app.send_static_file('index.html')


@app.route('/api/register', methods = ['POST'])
def register():
    data = request.json 

    if not data:
        return jsonify({'message': 'No input data provided'}), 400

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)
