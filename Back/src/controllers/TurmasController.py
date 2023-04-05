from flask import request
from flask_restful import Resource
from json import dumps,loads
from datetime import datetime, timedelta
from database.entities import Teachers, Classes, Specialties, Clinics, ScheduleClasses

class Turmas(Resource):

  def post(self, transaction):
    specialties = [row.name for row in Specialties().get()]
    teachers = [row.name for row in Teachers().get()]
    clinic = [row.name.title() for row in Clinics().get()]
    data = request.json

    obj = Classes(
      create_date = datetime.now(),
      name = data['name'],
      year = data['year'],
      semester = data['semester'],
      appointments = data['appointments_day'],
      queue = data['queue'],
      times = dumps(list(data['times'].values())),
      specialties_id = specialties.index(data['specialties']) + 1,
      clinic_id = clinic.index(data['clinic']) + 1,
      teacher_id = teachers.index(data['teacher']) + 1,
    )
    class_id = Classes().add(obj)

    schedule_classes = self.handle_schedule_classes(
      data['year'],
      data['semester'],
      class_id,
      data['appointments_day'],
      data['queue'],
      list(data['times'].values())
    )

    response = {}
    result = ScheduleClasses().post(schedule_classes)
    if result:
      response['menssage'] = 'Turma cadastrada com sucesso.'
      response['response'] = result
    else:
      response['menssage'] = 'Não foi possivel cadastrar. Entre em contato com o Administrador.'
      response['response'] = result

    return response

  def get(self, transaction):
    if transaction == 'filters':
      data = self.get_filters()
    else:
      data = self.get_all_classes()

    return data

  def delete(self, transaction):
    data = loads(request.args.get('data'))
    classes_id = data.get('id')
    
    try:
      ScheduleClasses().delete("""delete from healthlab.Class_Schedule where cs_class_id = {class_id};""".format(class_id = classes_id))
      Classes().delete(classes_id)
      result = True
    except:
      result = False

    return result

  def get_all_classes(self):
    specialties = [row.name.title() for row in Specialties().get()]
    teachers = [row.name for row in Teachers().get()]
    clinic = [row.name.title() for row in Clinics().get()]
    data = Classes().get()

    values = []
    for row in data:
      values.append({
        'create_date': row.create_date.strftime("%d/%m/%Y"),
        'id': row.class_id,
        'name': row.name,
        'year': row.year,
        'semester': row.semester,
        'times': loads(row.times),
        'queue': row.queue,
        'appointments': row.appointments,
        'clinic': clinic[row.clinic_id - 1],
        'specialties': specialties[row.specialties_id - 1],
        'teachers': teachers[row.teacher_id - 1]
      })

    return values

  def get_filters(self):
    response = {}
    specialties = [{"clinic": row.clinic_id, "name":row.name, "desc":row.description} for row in Specialties().get()]
    teachers = [{"clinic": row.clinic_id, "name": row.name} for row in Teachers().get()]

    response['specialties'] = specialties
    response['teacher'] = teachers
    
    return response

  def handle_schedule_classes(self, year, semester, classes, appointments, queue, weekdays):
    weekday_python = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom']
    weekday_selecetd = [weekday_python.index(item.get('weekday')) for item in weekdays]

    if semester == '1° Semestre':
      start = datetime.strptime(str(year)+'-01-01', '%Y-%m-%d')
      end = datetime.strptime(str(year)+'-06-30', '%Y-%m-%d')
    else:
      start = datetime.strptime(str(year)+'-07-01', '%Y-%m-%d')
      end = datetime.strptime(str(year)+'-12-31', '%Y-%m-%d')

    datediff = abs((start - end).days)*24

    values = []
    date = start

    for num in range(datediff):
      date += timedelta(hours=1)
      year = date.year
      month = date.month
      weekday = date.weekday()
      day = date.day
      hour = date.hour

      if weekday in weekday_selecetd:

        times = [(item.get('start'), item.get('end')) for item in weekdays if item.get('weekday') == weekday_python[weekday]][0]

        if hour >= 7 and hour <= 18:
          if hour >= int(times[0].split(':')[0]) and hour <= int(times[1].split(':')[0]):
            values.append(
              ScheduleClasses(
                date = date,
                year = year,
                month = month,
                weekday = weekday_python[weekday],
                day = day,
                hour = hour,
                number_students_available = appointments,
                queue = 5 if queue == 1 else 0,
                active = True,
                classes_id = classes
              )
            )
          else:
            values.append(
              ScheduleClasses(
                date = date,
                year = year,
                month = month,
                weekday = weekday_python[weekday],
                day = day,
                hour = hour,
                number_students_available = 0,
                queue = 5 if queue == 1 else 0,
                active = False,
                classes_id = classes
              )
            )

      else:
        if hour >= 7 and hour <= 18:
          values.append(
            ScheduleClasses(
              date = date,
              year = year,
              month = month,
              weekday = weekday_python[weekday],
              day = day,
              hour = hour,
              number_students_available = 0,
              queue = 0,
              active = False,
              classes_id = classes
            )
          )      
    return values
