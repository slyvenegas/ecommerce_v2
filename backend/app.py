from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash
from time import time

app = Flask(__name__)
CORS(app)
DATA_FILE = 'users.json'
attempts = {}

def read_users():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

def write_users(users):
    with open(DATA_FILE, 'w') as file:
        json.dump(users, file)

@app.route('/')
def home():
    return redirect(url_for('login'))

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    users = read_users()
    
    if username in attempts and attempts[username]['count'] >= 3 and time() - attempts[username]['time'] < 300:
        return jsonify({'message': 'Has alcanzado el número máximo de intentos. Inténtalo más tarde.'}), 403

    for user in users:
        if user['username'] == username and check_password_hash(user['password'], password):
            attempts.pop(username, None)  # Reset attempts on successful login
            return jsonify({'message': 'Login exitoso'}), 200

    if username in attempts:
        attempts[username]['count'] += 1
        attempts[username]['time'] = time()
    else:
        attempts[username] = {'count': 1, 'time': time()}

    return jsonify({'message': 'Usuario no encontrado, por favor registrese'}), 404

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    users = read_users()
    
    for user in users:
        if user['username'] == username:
            return jsonify({'message': 'Usuario ya existe'}), 400
    
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')  # Método corregido
    new_user = {'username': username, 'password': hashed_password}
    users.append(new_user)
    write_users(users)
    
    return jsonify({'message': 'Registro exitoso'}), 201

if __name__ == '__main__':
    app.run(debug=True)
