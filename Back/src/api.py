from flask import Flask, request
from flask_restful import Resource, Api
from flask_compress import Compress
from flask_cors import CORS
from json import dumps,loads
from datetime import datetime, timedelta
import numpy as np
import jwt

from controllers.AppointmentsController import Appointments
from controllers.LoginController import Login
from controllers.SchedulingController import Scheduling
from controllers.TurmasController import Turmas
from controllers.ColabsController import Colabs


app = Flask(__name__)
Compress(app)
CORS(app) 

@app.route("/")

class App():

  api = Api(app)
  api.add_resource(Login, '/login')
  api.add_resource(Scheduling, '/scheduling')
  api.add_resource(Appointments, '/appointments/<entity>')
  api.add_resource(Turmas, '/turmas/<transaction>')
  api.add_resource(Colabs, '/colabs/<transaction>')

if __name__ == '__main__':
  app.run()