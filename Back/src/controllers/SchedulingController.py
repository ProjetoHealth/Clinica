from flask import request
from flask_restful import Resource
from json import loads
from database.entities import Specialties, Patients, Schedules

class Scheduling(Resource):

  def get(self):
    specialties = [row.name.title() for row in Specialties().get()]
    patients = Patients().get()
    result = Schedules().get()

    scheduled = Schedules().fetch_all("""
      select 
        count(*)
      from healthlab.Schedules
      where scheduling_status = 0;
    """)[0][0]

    confirmed = Schedules().fetch_all("""
      select 
        count(*)
      from healthlab.Schedules
      where scheduling_status = 1;
    """)[0][0]

    completed = Schedules().fetch_all("""
      select 
        count(*)
      from healthlab.Schedules
      where scheduling_status = 2;
    """)[0][0]
    
    response = {}
    scheduling = []
    for row in result:
      scheduling.append({
        'id': row.scheduling_id,
        'patient': [item.name for item in patients if item.patient_id == row.patient_id][0],
        'email': [item.email for item in patients if item.patient_id == row.patient_id][0],
        'tell': [item.tell for item in patients if item.patient_id == row.patient_id][0],
        'date': row.date.strftime("%d/%m/%Y"),
        'weekday': row.weekday,
        'time': row.time,
        'clinic_id': row.clinic_id,
        'specialties': specialties[row.specialties_id - 1],
        'status': row.status
      })

    response['scheduling'] = scheduling
    response['scheduled'] = scheduled
    response['confirmed'] = confirmed
    response['completed'] = completed

    return response

  def put(self):
    data = request.json

    response = {}
    try:
      Schedules().update(data.get('id'), data.get('status'))
      response['response'] = True
      response['message'] = "Status alterado com sucesso."
    except:
      response['response'] = False
      response['message'] = "Não foi possivel alterar o status da consulta."

    return response

  def delete(self):
    data = loads(request.args.get('data'))

    response = {}
    try:
      Schedules().delete(data.get('id'))
      response['response'] = True
      response['message'] = "Agendamento removido com sucesso."
    except:
      response['response'] = False
      response['message'] = "Não foi possivel remover agendamento."

    return response
