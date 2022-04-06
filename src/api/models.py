from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

class Travel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    user_id = db.Column(db.Integer, nullable=False)
    Location = db.Column(db.String(), unique=False)
    begin_date = db.Column(db.Date(), unique=False)
    end_date = db.Column(db.Date(), unique=False)

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