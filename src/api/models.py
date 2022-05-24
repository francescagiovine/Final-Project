from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    def __repr__(self):
        return '<User %r>' % self.name
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,

        }
    def get_user(id):
        user = User.query.filter_by(id=id).first()
        return User.serialize(user)

class Travel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String())
    begin_date = db.Column(db.DateTime())
    end_date = db.Column(db.DateTime())
    location = db.Column(db.String())
    media = db.Column(db.String(255), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('travel', lazy=True))

    def __repr__(self):
        return '<Travel %r>' % self.name
        
    def serialize(self):
        return {

            "name": self.name,
            "description": self.description,
            "begin_date": self.begin_date.strftime("%Y-%m-%dT%H:%M"),           
            "end_date": self.end_date.strftime("%Y-%m-%dT%H:%M"),  
            "location": self.location,
            "id": self.id,
            "media": self.media

        }

    def serializeTimeline(self): 

        if self.media is not None:
            current_url = self.media
        else:
            current_url = ""

        return {
        
                "media" : {
                    "url": current_url,
                    "caption" : self.location
                },
                "start_date": {
                    "minute" : self.begin_date.strftime("%M"),
                    "hour" : self.begin_date.strftime("%H"),
                    "day" : self.begin_date.strftime("%d"),
                    "month" : self.begin_date.strftime("%m"),
                    "year" : self.begin_date.strftime("%Y"),
                },
                "end_date": {
                    "minute" : self.end_date.strftime("%M"),
                    "hour" : self.end_date.strftime("%H"),
                    "day" : self.end_date.strftime("%d"),
                    "month" : self.end_date.strftime("%m"),
                    "year" : self.end_date.strftime("%Y"),
                },                
                "text" : {
                    "headline": self.name,
                    "text" : self.description
                },
                "background": {
                    "color": "#42B2C9"
                }
            }
            
    @classmethod
    def get_by_id(cls, id):
        travel = cls.query.get(id)
        return travel

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    travel_id = db.Column(db.Integer, db.ForeignKey('travel.id'), nullable=False)
    location = db.Column(db.String(), unique=False)
    latitude = db.Column(db.String(), unique=False, nullable=True)
    longitude = db.Column(db.String(), unique=False, nullable=True)
    begin_date = db.Column(db.DateTime(), unique=False)
    end_date = db.Column(db.DateTime(timezone=False), unique=False)
    media = db.Column(db.String(255), unique=False, nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref=db.backref('activity', lazy=True))
    user = db.relationship('User', backref=db.backref('activity', lazy=True))
    travel = db.relationship('Travel', backref=db.backref('activity', lazy=True))
    def __repr__(self):
        return '<Activity %r>' % self.name
        
    def serialize(self):
        return {
            "name": self.name,
            "travel_id":self.travel_id,
            "location": self.location,
            "begin_date": self.begin_date.strftime("%Y-%m-%dT%H:%M"),           
            "end_date": self.end_date.strftime("%Y-%m-%dT%H:%M"),  
            "category":self.category.name,
            "category_id":self.category.id,
            "id": self.id,
            "latitude": self.latitude,
            "media": self.media,

        }
        
    def serializeTimeline(self):
         
        if self.latitude is not None:
            current_url = self.latitude
        elif self.media is not None:
            current_url = self.media
        else:
            current_url = ""

        return {
        
                "media" : {
                    "url": current_url,
                    "caption" : self.category.name
                },
                "start_date": {
                    "minute" : self.begin_date.strftime("%M"),
                    "hour" : self.begin_date.strftime("%H"),
                    "day" : self.begin_date.strftime("%d"),
                    "month" : self.begin_date.strftime("%m"),
                    "year" : self.begin_date.strftime("%Y"),
                },
                "end_date": {
                    "minute" : self.end_date.strftime("%M"),
                    "hour" : self.end_date.strftime("%H"),
                    "day" : self.end_date.strftime("%d"),
                    "month" : self.end_date.strftime("%m"),
                    "year" : self.end_date.strftime("%Y"),
                },                
                "text" : {
                    "headline": self.name,
                    "text" : self.location
                },
                "background": {
                    "color": "#42B2C9"
                }
            }
            
    @classmethod
    def get_by_id(cls, id):
        activity = cls.query.get(id)
        return activity



class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)  
    def __repr__(self):
        return '<Category %r>' % self.name 
    def serialize(self): 
        return {
            "id": self.id,
            "name": self.name,
        }

class Subcategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    category_id = db.Column(db.Integer)


    def __repr__(self):
        return '<Subcategory %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }