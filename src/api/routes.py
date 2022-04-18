"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Travel, Category
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import json
import logging
from datetime import datetime

api = Blueprint('api', __name__)



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


@api.route('/hello', methods=['GET'])
@jwt_required()
def get_hello():

    email = get_jwt_identity()
    response_body = {
        'message': email

    }

    return jsonify(response_body), 200


#api 2 - signup, here we create the signup service

@api.route('/signup', methods=['POST'])
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
  
@api.route('/createTrip', methods=['POST'])
@jwt_required()
def create_trip():

    print("hola")
    id = request.json.get('id')
    name = request.json.get('name')
    location = request.json.get('location')
    endDate = datetime.strptime(request.json.get('end_date'), '%Y-%m-%d')
    beginDate = datetime.strptime(request.json.get('begin_date'), '%Y-%m-%d')
    category_id = request.json.get('category_id')
    latitude = request.json.get('latitude')
    longitude = request.json.get('longitude')
    user_id = get_jwt_identity()

    travel = Travel(name=name, user_id=user_id, location=location, begin_date=beginDate, end_date=endDate, category_id=category_id)
    db.session.add(travel)
    db.session.commit()

    return jsonify({'response': "Viaje creado con éxito"}), 200

@api.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    usersResponse = []
    for user in users:
        usersResponse.append(user.serialize())

    return jsonify(usersResponse), 200

@api.route('/getTrips', methods=['GET'])

def list_trips():
    travels = Travel.query.all()
    response = []
    for travel in travels:
        response.append(travel.serialize()) 
           
    return jsonify(response), 200

@api.route('/delete-trip', methods=['POST'])
def delete_trip():
    id = request.json.get('id')
    travel = Travel.query.get(id)
    db.session.delete(travel)
    db.session.commit()

    response_body = {
        "message": "Viaje eliminado"
    }

    return jsonify(response_body), 200

@api.route('/trip/<int:id>', methods=['GET'])
def get_trip(id):
    trip = Travel.get_by_id(id)
    if trip: 
        return jsonify(trip.serialize()), 200
    return ({'error': 'Trip Not found'}), 404
    

@api.route('/getCategories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    categoriesResponse = []
    for category in categories:
        categoriesResponse.append(category.serialize())

    return jsonify(categoriesResponse), 200