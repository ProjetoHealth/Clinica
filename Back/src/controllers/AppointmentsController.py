from flask import request
from flask_restful import Resource
from datetime import datetime
import numpy as np
import jwt

from database.entities import  Specialties, Clinics, ScheduleClasses, Patients, Schedules

class Appointments(Resource):

  def get(self, entity):
    response = {}
    clinic = [row.name.title() for row in Clinics().get()]
    specialties = [row.name.title() for row in Specialties().get()]

    if entity == 'specialties':
      clinic_id = clinic.index(request.args.get('clinic')) + 1
      current_date = datetime.now().strftime("%Y-%m-%d")

      response['specialties'] = self.get_specialties(clinic_id, current_date)
    elif entity == 'agenda':
      dateSelected = request.args.get('dateSelected')
      specialty_id = specialties.index(request.args.get('specialty')) + 1
      
      response['schedule'] = self.get_agenda(dateSelected, specialty_id)
    elif entity == 'patient':
      patient_identity = request.args.get('patient')

      patient = self.get_patient(patient_identity) 
      if patient:
        response['patient'] = jwt.encode(patient, 'secret', algorithm='HS256')
        response['message'] = "Será um prazer atende-lo(a) novamente, "+ patient.get('name') +" "+patient.get('surname')
        response['result'] = True
      else:
        response['message'] = "Dados do(a) paciente não encontrado."
        response['result'] = False

    return response

  def post(self, entity):
    response = {}
    data = request.json

    patient_id = self.handle_patient(data.get('patient'))
    appointment = data.get('appointment')
    clinic = [row.name.title() for row in Clinics().get()]
    specialties = [row.name.title() for row in Specialties().get()]

    if appointment.get('queue'):
      date = appointment.get('date')
      specialties_id = specialties.index(data.get('specialty')) + 1
      if self.validate_queue(date, specialties_id):
        ScheduleClasses().update("""
          update healthlab.Class_Schedule a
          inner join healthlab.Classes b on b.class_id = a.cs_class_id
          set a.cs_queue = a.cs_queue - 1 
          where a.cs_date = '{date}'
            and b.class_specialties_id = {specialties_id};
        """.format(date = date, specialties_id = specialties_id))
        obj = Schedules(
            create_date = datetime.now(),
            date = appointment['date'],
            weekday = appointment['weekday'],
            time = appointment['time'],
            queue = appointment['queue'],
            terms = 1,
            status = 0,
            patient_id = patient_id,
            clinic_id = clinic.index(data['clinic']) + 1,
            specialties_id = specialties.index(data['specialty']) + 1
          )
        response['menssage'] = 'Agendamento realizado com sucesso.'
        response['response'] = Schedules().post(obj)
      else:
        response['menssage'] = 'Não temos mais disponibilidade na data e hora selecionada. Por favor, selecione outro horário.'
        response['response'] = False

    else:
      date = appointment['date']
      hour = int(appointment['time'].split(':')[0])
      specialties_id = specialties.index(data['specialty']) + 1
      if self.validate_schedule(date, hour, specialties_id):
        obj = Schedules(
          create_date = datetime.now(),
          date = appointment['date'],
          weekday = appointment['weekday'],
          time = appointment['time'],
          queue = appointment['queue'],
          terms = 1,
          status = 0,
          patient_id = patient_id,
          clinic_id = clinic.index(data['clinic']) + 1,
          specialties_id = specialties.index(data['specialty']) + 1
        )
        ScheduleClasses().update("""
          update healthlab.Class_Schedule a
          inner join healthlab.Classes b on b.class_id = a.cs_class_id
          set a.cs_number_students_available = a.cs_number_students_available - 1
          where a.cs_date = '{date}'
            and a.cs_hour = {hour}
            and b.class_specialties_id = {specialties_id};
        """.format(date = date, hour = hour, specialties_id = specialties_id))
        ScheduleClasses().update("""
          update healthlab.Class_Schedule a
          inner join healthlab.Classes b on b.class_id = a.cs_class_id
          set a.cs_active = a.cs_number_students_available > 0
          where a.cs_date = '{date}'
            and a.cs_hour = {hour}
            and b.class_specialties_id = {specialties_id};
        """.format(date = date, hour = hour, specialties_id = specialties_id))
        response['menssage'] = 'Agendamento realizado com sucesso.'
        response['response'] = Schedules().post(obj)
      else:
        response['menssage'] = 'Não temos mais disponibilidade na data e hora selecionada. Por favor, selecione outro horário.'
        response['response'] = False

    return response

  def get_specialties(self, clinic_id, current_date):
    result = Specialties().fetch_all("""
        select distinct
          a.*
        from healthlab.Specialties a
        inner join healthlab.Classes b on b.class_specialties_id = a.specialty_id
        inner join healthlab.Class_Schedule c on c.cs_class_id = b.class_id
        where a.specialty_clinic_id = {clinic_id}
          and c.cs_date > {current_date};
      """.format(clinic_id = clinic_id, current_date = current_date)
    )

    return [{"name": row[2], "desc": row[3]} for row in result]

  def get_agenda(self, dateSelected, specialty_id):
    result = ScheduleClasses().fetch_all("""
        select 
          a.cs_date,
          a.cs_hour,
          a.cs_number_students_available,
          a.cs_active,
          a.cs_queue
        from healthlab.Class_Schedule a
        inner join healthlab.Classes b on b.class_id = a.cs_class_id
        where a.cs_date between '{dateSelected}' and date_add('{dateSelected}', interval 6 day)
          and b.class_specialties_id = {specialty_id}
        order by 1;
      """.format(specialty_id = specialty_id, dateSelected = dateSelected)
    )


    days = np.unique([row[0] for row in result])
    values = {}
    for index, day in enumerate(days):
      key = 'd'+str(index)

      batch = []
      for row in result:
        if row[0] == day:
          batch.append({'time': str(row[1]).zfill(2) + ':00', 'available': row[2], 'active': row[3], 'queue': row[4]})

      values[key] = batch

    return [values] if values else []

  def get_patient(self, identity):
    response = {}
    data = Patients().get_filter_by(identity)
    
    if data:
      response['name'] = data.name
      response['surname'] = data.surname
      response['gender'] = data.gender
      response['birth_date'] = data.birth_date
      response['identity'] = data.identity
      response['email'] = data.email
      response['tell'] = data.tell
      response['cep'] = data.zip_code
      response['address'] = data.address
      response['district'] = data.district
      response['city'] = data.city
      response['state'] = data.state

    return response if response else None

  def handle_patient(self, patient):
    data = Patients().get_filter_by(patient.get('identity'))

    if not data:
      obj = Patients(
        create_date = datetime.now(),
        name = patient['name'],
        surname = patient['surname'],
        gender = patient['gender'],
        birth_date = patient['birthday'].split('T')[0],
        identity = patient['identity'],
        email = patient['email'],
        tell = patient['tell'],
        zip_code = patient['cep'],
        address = patient['address'] +', '+ patient['number'],
        district = patient['district'],
        city = patient['city'],
        state = patient['state']
      )
      Patients().post(obj)
      data = Patients().get_filter_by(patient.get('identity'))
    
    return data.patient_id      

  def validate_schedule(self, date, hour, specialties_id):
    result = ScheduleClasses().fetch_all("""
      select 
        a.cs_number_students_available
      from healthlab.Class_Schedule a
      inner join healthlab.Classes b on b.class_id = a.cs_class_id
      where a.cs_date = '{date}'
        and a.cs_hour = {hour}
        and b.class_specialties_id = {specialties_id};
    """.format(date = date, hour = hour, specialties_id = specialties_id))[0][0]

    return True if result > 0 else False

  def validate_queue(self, date, specialties_id):
    result = ScheduleClasses().fetch_all("""
      select distinct
        a.cs_queue
      from healthlab.Class_Schedule a
      inner join healthlab.Classes b on b.class_id = a.cs_class_id
      where a.cs_date = '{date}'
        and b.class_specialties_id = {specialties_id};
    """.format(date = date, specialties_id = specialties_id))[0][0]

    return True if result > 0 else False
