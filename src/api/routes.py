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

import cloudinary
import cloudinary.uploader

cloudinary.config( 
  cloud_name = "dycp5engp", 
  api_key = "672335987197793", 
  api_secret = "S_JT9qrYmuqqj5WN5YhWXRiBfsI",
#   secure = true
)


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
        "email": user.email,
        "name": user.name,
        "id": user.id
    }

    return jsonify(data_response), 200

# this way we are sure the data is coming from the api and is the right data
# end of api 1 - login






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
    name = request.form.get('name')
    location = request.form.get('location')
    endDate = datetime.strptime(request.form.get('end_date'), '%Y-%m-%dT%H:%M')
    beginDate = datetime.strptime(request.form.get('begin_date'), '%Y-%m-%dT%H:%M')
    category_id = request.form.get('category_id')
    latitude = "1"
    longitude = "2"
    user_id = get_jwt_identity()

        # validate that the front-end request was built correctly
    if 'media' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['media'])
        image_url = result['secure_url']
    else:
        raise APIException('Missing media on the FormData')

    travel = Travel( name=name, user_id=user_id, location=location, begin_date=beginDate, end_date=endDate, category_id=category_id, media=image_url)
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
@jwt_required()
def list_trips():
    user_id = get_jwt_identity()    
    travels = Travel.query.filter_by(user_id = user_id).all()
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

#Endpoint para el Timeline

@api.route('/timeline/<int:id>', methods=['GET'])
#@jwt_required()
def timeline(id):
    travels = Travel.query.filter_by(user_id = id).all() 
    response = {  
    'title': {
        'text': {
            'headline' : 'My Trip',
            'text' : 'Swipe to see your activities'
            },
        "media": {
          "url": "https://www.travelclearing.com/wp-content/uploads/logo100-521x600.png",
        },
    },
    'events': [
        travel.serializeTimeline() for travel in travels
    ]
    }
    
    

    #return jsonify(response[0],response[1],response[2],response[3],response[4],response[5]), 200
    return jsonify(response), 200
  

@api.route('/getCategories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    categoriesResponse = []
    for category in categories:
        categoriesResponse.append(category.serialize())

    return jsonify(categoriesResponse), 200  

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id= get_jwt_identity()
    user= User.get_user(user_id)
    return jsonify(user),200

@api.route('/modify/user', methods=['PUT'])
@jwt_required()
def modify_user():
    user_id= get_jwt_identity()
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')
    user= User.query.get(user_id)
    if name:
        user.name= name
    if email:    
        user.email= email
    if password:
        user.password= password
    db.session.commit()
    return jsonify(user.serialize()),200 
    return jsonify(categoriesResponse), 200

@api.route('/editTrip', methods=['POST'])
@jwt_required()
def edit_trip():

    id = request.json.get('id')
    trip = Travel.get_by_id(id)
    trip.name = request.json.get('name')
    trip.location = request.json.get('location')
    trip.end_date = datetime.strptime(request.json.get('end_date'), '%Y-%m-%dT%H:%M')
    trip.begin_date = datetime.strptime(request.json.get('begin_date'), '%Y-%m-%dT%H:%M')
    # category_id = request.json.get('category_id')
    # latitude = request.json.get('latitude')
    # longitude = request.json.get('longitude')
    # user_id = get_jwt_identity()

    db.session.commit()

    return jsonify({'response': "Viaje editado con éxito"}), 200

# @api.route('/user', methods=['GET'])
# @jwt_required()
# def get_user():
#     user_id= get_jwt_identity()
#     user= User.query.filter_by(id=id).first()
#     return jsonify(user),200
