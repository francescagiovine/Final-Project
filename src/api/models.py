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

class Travel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    location = db.Column(db.String(), unique=False)
    latitude = db.Column(db.String(), unique=False, nullable=True)
    longitude = db.Column(db.String(), unique=False, nullable=True)
    begin_date = db.Column(db.DateTime(), unique=False)
    end_date = db.Column(db.DateTime(timezone=False), unique=False)
    media = db.Column(db.String(), unique=False, nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref=db.backref('travel', lazy=True))
    user = db.relationship('User', backref=db.backref('travel', lazy=True))
    def __repr__(self):
        return '<Travel %r>' % self.name
        
    def serialize(self):
        return {
            "name": self.name,
            "location": self.location,
            "begin_date": self.begin_date.strftime("%d/%m/%Y %H:%M"),           
            "end_date": self.end_date.strftime("%d/%m/%Y %H:%M"),  
            "category":self.category.name,
            "id": self.id,
            "media": self.media

        }
        
    def serializeTimeline(self): 
        return {
        
                "media" : {
                    "url": self.media,
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
                    "text" : self.category.name
                }
            }
            
    @classmethod
    def get_by_id(cls, id):
        trip = cls.query.get(id)
        return trip



class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String())
    travel_id = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer)
    subcategory_id = db.Column(db.Integer)
    begin_date = db.Column(db.DateTime())
    end_date = db.Column(db.DateTime())
    Location = db.Column(db.String())
    cost = db.Column(db.Float())

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
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }