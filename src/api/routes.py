"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Travel, Category, Activity
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
        "id": user.id,
    }
    return jsonify(data_response), 200


@api.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    usersResponse = []
    for user in users:
        usersResponse.append(user.serialize())
    return jsonify(usersResponse), 200


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

  # TRAVEL

@api.route('/getTravels', methods=['GET'])
@jwt_required()
def list_travels():
    user_id = get_jwt_identity()    
    travels = Travel.query.filter_by(user_id = user_id).all()
    response = []
    for travel in travels:
        response.append(travel.serialize())            
    return jsonify(response), 200

@api.route('/travel/<int:id>', methods=['GET'])
def get_travel(id):
    travel = Travel.get_by_id(id)
    if travel: 
        return jsonify(travel.serialize()), 200
    return ({'error': 'Travel not found'}), 404

@api.route('/createTravel', methods=['POST'])
@jwt_required()
def create_travel():

    name = request.form.get('name')
    location = request.form.get('location')
    description = request.form.get('description')
    location_url = request.form.get('location_url')
    endDate = datetime.strptime(request.form.get('end_date'), '%Y-%m-%dT%H:%M')
    beginDate = datetime.strptime(request.form.get('begin_date'), '%Y-%m-%dT%H:%M')
    category_id = request.form.get('category_id')
    user_id = get_jwt_identity()

        # validate that the front-end request was built correctly
    if 'media' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['media'])
        image_url = result['secure_url']
    else:
        # raise APIException('Missing media on the FormData')
        image_url = "https://res.cloudinary.com/dycp5engp/image/upload/v1651147412/qfwgk92acqqnkoqdbraj.png"

    travel = Travel( name=name, user_id=user_id, description=description, location=location, begin_date=beginDate, end_date=endDate, media=image_url)
    db.session.add(travel)
    db.session.commit()
    return jsonify({'response': "Created succesfully"}), 200

@api.route('/editTravel', methods=['POST'])
@jwt_required()
def edit_travel():
    id = request.json.get('id')
    travel = Travel.get_by_id(id)
    travel.name = request.json.get('name')
    travel.location = request.json.get('location')
    travel.description = request.json.get('description')
    travel.latitude = request.json.get('latitude')
    travel.end_date = datetime.strptime(request.json.get('end_date'), "%Y-%m-%dT%H:%M")
    travel.begin_date = datetime.strptime(request.json.get('begin_date'), "%Y-%m-%dT%H:%M")
    user_id = get_jwt_identity()
    db.session.commit()
    return jsonify({'response': "Edited succesfully"}), 200

@api.route('/delete-travel', methods=['POST'])
def delete_travel():
    id = request.json.get('id')
    travel = Travel.query.get(id)
    db.session.delete(travel)
    db.session.commit()
    response_body = {
        "message": "travel deleted"
    }
    return jsonify(response_body), 200



#Endpoint para el Timeline
@api.route('/timeline-travel/<int:id>', methods=['GET'])
#@jwt_required()
def timelineTravel(id):
    travels = Travel.query.filter_by(user_id = id).all() 
    
    if not travels:
        response = {  

    "title": {
        "media": {
          "url": "https://i.pinimg.com/originals/5a/65/ee/5a65ee278cd557143f05a4ba91abbfa8.gif",
          "caption": "You can add maps, videos, pictures or pdf's like tickets or entries",
          "credit": "pinterest /<a href='www.behance.net/galitsky'> Elena Galitsky</a>"
        },
        "text": {
          "headline": "Welcome to Wide Travel<br/> ",
          "text": '<p> Please take one minute to watch our tutorial, clicking to the arrow at the right or start creating a new travel in the button "+ new Travel"</p>'
        },
        "background": {
            "color": "#7f1105"
        }
    },
    "events": [
      {
        "media": {
          "url": "https://www.youtube.com/watch?v=z9R8pbbhO_c",
          "caption": "",
          "credit": ""
        },
        "start_date": {
          "day": "1"
        },
        "text": {
          "headline": "A Little Tutorial",
          "text": "<p>Take 2 minutes and watch this video</p>"
        },
        "background": {
            "color": "#054398"
        }

      },
      {
        "text": {
          "headline": "Let's Begin!",
          "text": "<p>That's everything, now you can start planning your next adventure!</p>"
        },
        "media": {
          "url": "https://i.pinimg.com/originals/d0/d7/39/d0d739c791767eed5b525701de37150a.gif",
          "caption": "",
          "credit": ""
        },
        "start_date": {
          "month": "",
          "day": "2",
          "year": ""
        }
      }
    ]
    }

    else:
        response = {  
    'title': {
        'text': {
            'headline' : 'My Travels',
            'text' : 'Swipe to see your travels'
            },
        "media": {
          "url": "",
        },
    },
    'events': [
        travel.serializeTimeline() for travel in travels
    ]
    }
    return jsonify(response), 200
 
  
@api.route('/timeline-activity/<int:id>', methods=['GET'])
#@jwt_required()
def timelineActivity(id):
    activities = Activity.query.filter_by(user_id = id).all()
    if not activities:
        response = {  

    "title": {
        "media": {
          "url": "https://i.pinimg.com/originals/5a/65/ee/5a65ee278cd557143f05a4ba91abbfa8.gif",
        },
        "text": {
          "headline": "No Activities ",
          "text": "<p>Your activities will be shown here</p>"
        },
        "background": {
            "color": "#7f1105"
        }
    },
    "events": [
      {
        "start_date": {
          "month": "",
          "day": "",
          "year": ""
        },
        "text": {
          "headline": "Create a new activity and it will be shown here", 
          "text": "",
        }
      }
    ]
    }

    else:
        response = {  
    'title': {
        'text': {
            'headline' : 'My Activities',
            'text' : 'Swipe to see your activities'
            },
        "media": {
          "url": "",
        },
    },
    'events': [
        activity.serializeTimeline() for activity in activities
    ]
    }
    return jsonify(response), 200

@api.route('/timeline-activity-by-travel/<int:id>', methods=['GET'])
#@jwt_required()
def timelineActivitybyTravel(id):
    activities = Activity.query.filter_by(travel_id = id).all()
    if not activities:
        response = {  

    "title": {
        "media": {
          "url": "https://i.pinimg.com/originals/5a/65/ee/5a65ee278cd557143f05a4ba91abbfa8.gif",
        },
        "text": {
          "headline": "No Activities ",
          "text": "<p>Your activities will be shown here</p>"
        },
        "background": {
            "color": "#7f1105"
        }
    },
    "events": [
      {
        "start_date": {
          "month": "",
          "day": "",
          "year": ""
        },
        "text": {
          "headline": "Create a new activity and it will be shown here", 
          "text": "",
        }
      }
    ]
    }

    else:
        response = {  
    'title': {
        'text': {
            'headline' : 'My Activities',
            'text' : 'Swipe to see your activities'
            },
        "media": {
          "url": "",
        },
    },
    'events': [
        activity.serializeTimeline() for activity in activities
    ]
    }
    return jsonify(response), 200

@api.route('/getCategories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    categoriesResponse = []
    for category in categories:
        categoriesResponse.append(category.serialize())

    return jsonify(categoriesResponse), 200  

    # ACTIVITIES

@api.route('/getActivities', methods=['GET'])
@jwt_required()
def list_activities():
    user_id = get_jwt_identity()    
    activities = Activity.query.filter_by(user_id = user_id).all()
    response = []
    for activity in activities:
        response.append(activity.serialize())            
    return jsonify(response), 200

@api.route('/getActivitiesByTravel/<int:id>', methods=['GET'])
@jwt_required()
def list_activities_by_travel(id):
    user_id = get_jwt_identity()   
    activities = Activity.query.filter_by(travel_id = id).all()
    response = []
    for activity in activities:
        response.append(activity.serialize())            
    return jsonify(response), 200

@api.route('/activity/<int:id>', methods=['GET'])
def get_activity(id):
    activity = Activity.get_by_id(id)
    if activity: 
        return jsonify(activity.serialize()), 200
    return ({'error': 'Activity not found'}), 404

@api.route('/createActivity', methods=['POST'])
@jwt_required()
def create_activity():
    name = request.form.get('name')
    user_id = get_jwt_identity()
    travel_id = request.form.get('travel_id')
    location = request.form.get('location')
    location_url = request.form.get('location_url')
    beginDate = datetime.strptime(request.form.get('begin_date'), '%Y-%m-%dT%H:%M')
    endDate = datetime.strptime(request.form.get('end_date'), '%Y-%m-%dT%H:%M')
    category_id = request.form.get('category_id')
    


        # validate that the front-end request was built correctly
    if 'media' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['media'])
        image_url = result['secure_url']
    else:
        # raise APIException('Missing media on the FormData')
        image_url = "https://res.cloudinary.com/dycp5engp/image/upload/v1651147412/qfwgk92acqqnkoqdbraj.png"

    activity = Activity( name=name, user_id=user_id, location=location, latitude=location_url, begin_date=beginDate, end_date=endDate, category_id=category_id, media=image_url, travel_id = travel_id)
    db.session.add(activity)
    db.session.commit()
    return jsonify({'response': "Created succesfully"}), 200

@api.route('/editActivity', methods=['POST'])
@jwt_required()
def edit_activity():
    id = request.json.get('id')
    activity = Activity.get_by_id(id)
    activity.name = request.json.get('name')
    activity.location = request.json.get('location')
    activity.end_date = datetime.strptime(request.json.get('end_date'), "%Y-%m-%dT%H:%M")
    activity.begin_date = datetime.strptime(request.json.get('begin_date'), "%Y-%m-%dT%H:%M")
    activity.category_id = request.json.get('category_id')
    activity.latitude = request.json.get('latitude')
    user_id = get_jwt_identity()
    db.session.commit()
    return jsonify({'response': "Edited succesfully"}), 200

@api.route('/delete-activity', methods=['POST'])
def delete_activity():
    id = request.json.get('id')
    activity = Activity.query.get(id)
    db.session.delete(activity)
    db.session.commit()
    response_body = {
        "message": "Activity deleted"
    }
    return jsonify(response_body), 200


