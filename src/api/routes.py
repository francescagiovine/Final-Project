"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#api 1 - login, here i create the login service
@api.route('/login', methods=['POST'])
def login():

    email = request.json.get('email') 
    password = request.json.get('password') 

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"message":"El usuario o contraseña incorrectos"}), 401

    token = create_access_token(identity = user.id)

    data_response = {
        "token" : token,
        "email": email,
        "password": password
    }

    return jsonify(data_response), 200

# this way we are sure the data is coming from the api and is the right data
# end of api 1 - login

#api 2 - signup, here we create the signup service

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

  # end of api 2 - signup
