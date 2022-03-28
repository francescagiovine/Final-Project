"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign-up', methods=['POST'])
def sign_up():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    already_used = User.query.filter_by(email=email).first()
    if already_used: 
        return jsonify({"message": "El email ya está utilizado"}), 401
    user = User(name=name, email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({'response': "Usuario creado con éxito"}), 200
