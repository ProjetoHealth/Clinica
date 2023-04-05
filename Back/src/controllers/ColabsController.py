
from flask import request
from flask_restful import Resource
from json import loads
from datetime import datetime


from database.entities import Users, Employees, Teachers

class Colabs(Resource):

  def get(self, transaction):
    result = Users().fetch_all("""
      select 
        a.user_create_date,
        coalesce(b.teacher_name, d.employee_name) as user_name,
        a.user_email,
        coalesce(b.teacher_identity, d.employee_identity) as user_identity,
        a.user_type,
        coalesce(b.teacher_clinic_id,'null') teacher_clinic_id
      from healthlab.Users a
      left join healthlab.Teachers b on b.teacher_user_id = a.user_id and a.user_type = 'teacher'
      left join healthlab.Employees d on d.employee_user_id = a.user_id and a.user_type in ('admin','employee');
    """)

    values = []
    for row in result:
      values.append({
        'create_date': row[0].strftime("%d/%m/%Y"),
        'name': row[1],
        'email': row[2],
        'identity': row[3],
        'type': row[4],
        'clinic_id': row[5]
      })

    return values

  def put(self, transaction):
    data = request.json
    user = Users().get_filter_by(data.get('email'))
    
    if user.user_type != data.get('type'):
      if user.user_type in ['employee','admin']:
        Employees().delete(user.user_id)
      elif user.user_type in 'teacher':
        Teachers().delete(user.user_id)

      if data.get('type') in ['employee','admin']:
        obj = Employees(
          create_date = datetime.now(),
          name = data.get('name'),
          identity = data.get('identity'),
          user_id = user.user_id
        )
        Employees().add(obj)
        Users().update(user.user_id, data.get('type'))
      elif data.get('type') in 'teacher':
        obj = Teachers(
          create_date = datetime.now(),
          name = data.get('name'),
          identity = data.get('identity'),
          user_id = user.user_id,
          clinic_id = data.get('clinic_id')
        )
        Employees().add(obj)
        Users().update(user.user_id, data.get('type'))  

  def delete(self, transaction):
    data = loads(request.args.get('data'))
    user = Users().get_filter_by(data.get('email'))

    if user.user_type in ['employee','admin']:
      Employees().delete(user.user_id)
    elif user.user_type in 'teacher':
      Teachers().delete(user.user_id)

    Users().delete(user.user_id)

  def post(self, transaction):
    data = request.json

    response = {}
    try:
      user = Users(
        create_date = datetime.now(),
        email = data.get('email'),
        password = 'Healthlab4.0',
        user_type = data.get('type')
      )
      user_id = Users().add(user)
      
      if data.get('type') in ['employee','admin']:
        obj = Employees(
          create_date = datetime.now(),
          name = data.get('name'),
          identity = data.get('identity'),
          user_id = user_id
        )
        Employees().add(obj)
      else:
        obj = Teachers(
          create_date = datetime.now(),
          name = data.get('name'),
          identity = data.get('identity'),
          user_id = user_id,
          clinic_id = data.get('clinic_id')
        )
        Teachers().add(obj)

      response['response'] = True
      response['message'] = "Colaborador cadastrado com sucesso."
    except:
      response['response'] = False
      response['message'] = "Falha ao cadastrar o colaborador."

    return response
