from flask import request
from flask_restful import Resource

from database.entities import Users, Employees, Teachers

class Login(Resource):

  def post(self):
    email = request.json.get('email')
    password =request.json.get('pwsd')

    response = {}
    user = Users().get_filter_by(email)
    if user:

      if user.password == password:

        if user.user_type in ['admin','employee']:
          data = Employees().get_filter_by(user.user_id)
        elif user.user_type == 'teacher':
          data = Teachers().get_filter_by(user.user_id)

        response["message"] = "Seja bem-vindo, "+data.name
        response["response"] = True
      else:
        response["message"] = "Senha inválida!"
        response["response"] = False
    else:
      response["message"] = "Desculpe, você ainda não está cadastrado em nosso sistema. Favor entre em contato com o administrador."
      response["response"] = False

    return response