from sqlalchemy import Column, Integer, String, DateTime, Boolean, exc
from sqlalchemy.ext.declarative import declarative_base
from database.connection import Connetcions

Base = declarative_base()
conn = Connetcions()

class Users(Base):
  __tablename__ = 'Users'

  create_date = Column('user_create_date', DateTime())
  user_id = Column(Integer, primary_key=True, autoincrement=True)
  email = Column('user_email',String(200))
  password = Column('user_password',String(200))
  user_type = Column('user_type',String(200))
  
  def get_filter_by(self, value):
    session = conn.session()
    data = session.query(Users).filter_by(email = value).first()
    session.close()

    return data

  def update(self, user_id, value):
    session = conn.session()
    session.query(Users).filter_by(user_id = user_id).update({'user_type': value})
    session.commit()
    session.close()

  def delete(self, user_id):
    session = conn.session()
    obj = session.query(Users).filter_by(user_id = user_id).first()
    session.delete(obj)
    session.commit()
    session.close()

  def add(self, obj):
    try:
      session = conn.session()
      session.add(obj)
      session.flush()

      result = obj.user_id
      
      session.commit()
      session.close()
    except exc.IntegrityError:
      print(exc.IntegrityError)
      result = False
      pass
    
    return result

  def fetch_all(self, query):
    stmt = conn.engine().connect()
    return [row for row in stmt.execute(query)]

class Employees(Base):
  __tablename__ = 'Employees'

  create_date = Column('employee_create_date', DateTime())
  employee_id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column('employee_name',String(200))
  identity = Column('employee_identity',String(200))
  user_id = Column('employee_user_id',Integer)

  def add(self, obj):
    try:
      session = conn.session()
      session.add(obj)      
      session.commit()
      session.close()
    except exc.IntegrityError:
      print(exc.IntegrityError)
      pass

  def get_filter_by(self, value):
    session = conn.session()
    data = session.query(Employees).filter_by(user_id = value).first()
    session.close()
    return data

  def delete(self, user_id):
    session = conn.session()
    obj = session.query(Employees).filter_by(user_id = user_id).first()
    session.delete(obj)
    session.commit()
    session.close()

class Teachers(Base):
  __tablename__ = 'Teachers'

  create_date = Column('teacher_create_date', DateTime())
  teacher_id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column('teacher_name',String(200))
  identity = Column('teacher_identity',String(200))
  user_id = Column('teacher_user_id',Integer)
  clinic_id = Column('teacher_clinic_id',Integer)

  def get_filter_by(self, value):
    session = conn.session()
    data = session.query(Teachers).filter_by(user_id = value).first()
    session.close()
    return data

  def delete(self, user_id):
    session = conn.session()
    obj = session.query(Teachers).filter_by(user_id = user_id).first()
    session.delete(obj)
    session.commit()
    session.close()

  def get(self):
    session = conn.session()
    data = session.query(Teachers).all()
    session.close()
    return data
  
  def add(self, obj):
    try:
      session = conn.session()
      session.add(obj)      
      session.commit()
      session.close()
    except exc.IntegrityError:
      print(exc.IntegrityError)
      pass

class Classes(Base):
  __tablename__ = 'Classes'

  create_date = Column('class_create_date', DateTime())
  class_id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column('class_name',String(200))
  year = Column('class_year',Integer)
  semester = Column('class_semester',String(200))
  appointments = Column('class_appointments',Integer)
  queue = Column('class_queue',Boolean)
  times = Column('class_times',String(200))
  specialties_id = Column('class_specialties_id',Integer)
  clinic_id = Column('class_clinic_id',Integer)
  teacher_id = Column('class_teacher_id',Integer)

  def get(self):
    session = conn.session()
    data = session.query(Classes).all()
    session.close()
  
    return data

  def add(self, obj):
    try:
      session = conn.session()
      session.add(obj)
      session.flush()

      result = obj.class_id
      
      session.commit()
      session.close()
    except exc.IntegrityError:
      print(exc.IntegrityError)
      result = False
      pass
    
    return result
  
  def delete(self, class_id):
    session = conn.session()
    obj = session.query(Classes).filter_by(class_id = class_id).first()
    session.delete(obj)
    session.commit()
    session.close()

class ScheduleClasses(Base):
  __tablename__ = 'Class_Schedule'

  cs_id = Column(Integer, primary_key=True, autoincrement=True)
  date = Column('cs_date', DateTime())
  year = Column('cs_year',Integer)
  month = Column('cs_month',Integer)
  weekday = Column('cs_weekday',String(200))
  day = Column('cs_day',Integer)
  hour = Column('cs_hour',Integer)
  number_students_available = Column('cs_number_students_available',Integer)
  queue = Column('cs_queue',Integer)
  active =Column('cs_active',Boolean)
  classes_id = Column('cs_class_id',Integer)

  def post(self, values):
    try:
      session = conn.session()
      session.bulk_save_objects(values)      
      session.commit()
      result = True
    except exc.IntegrityError:
      print(exc.IntegrityError)
      result = False
      pass
    
    return result

  def fetch_all(self, query):
    stmt = conn.engine().connect()
    return [row for row in stmt.execute(query)]

  def update(self, query):
    stmt = conn.engine().connect()
    stmt.execute(query, multi=True)

  def delete(self, query):
    stmt = conn.engine().connect()
    stmt.execute(query)

class Specialties(Base):
  __tablename__ = 'Specialties'

  create_date = Column('specialty_create_date', DateTime())
  specialty_id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column('specialty_name',String(200))
  description = Column('specialty_description',String(1200))
  clinic_id = Column('specialty_clinic_id',Integer)

  def get(self):
    session = conn.session()
    data = session.query(Specialties).all()
    session.close()
    return data

  def get_filter_by(self, value):
    session = conn.session()
    data = session.query(Specialties).filter_by(clinic_id = value, active = True).all()
    session.close()
    return data

  def fetch_all(self, query):
    stmt = conn.engine().connect()
    return [row for row in stmt.execute(query)]

class Clinics(Base):
  __tablename__ = 'Clinics'

  create_date = Column('clinic_create_date', DateTime())
  clinic_id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column('clinic_name',String(200))
  description = Column('clinic_description',String(1200))

  def get(self):
    session = conn.session()
    data = session.query(Clinics).all()
    session.close()
    return data

class Patients(Base):
  __tablename__ = 'Patiants'

  create_date = Column('patient_create_date', DateTime())
  patient_id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column('patient_name',String(100))
  surname = Column('patient_surname',String(100))
  gender = Column('patient_gender',String(100))
  birth_date = Column('patient_birth_date', DateTime())
  identity = Column('patient_identity',String(100))
  email = Column('patient_email',String(100))
  tell = Column('patient_tell',String(100))
  zip_code = Column('patient_zip_code',String(100))
  address = Column('patient_address',String(100))
  district = Column('patient_district',String(100))
  city = Column('patient_city',String(100))
  state = Column('patient_state',String(100))

  def get(self):
    session = conn.session()
    data = session.query(Patients).all()
    session.close()
    return data

  def get_filter_by(self, value):
    session = conn.session()
    data = session.query(Patients).filter_by(identity = value).first()
    session.close()
    return data

  def post(self, patient):
    try:
      session = conn.session()
      session.add(patient)
      session.commit()
      session.close()
      
      result = True
    except exc.IntegrityError:
      print(exc.IntegrityError)
      result = False
      pass
    
    return result

class Schedules(Base):
  __tablename__ = 'Schedules'

  create_date = Column('scheduling_create_date', DateTime())
  scheduling_id = Column(Integer, primary_key=True, autoincrement=True)
  date = Column('scheduling_date', DateTime())
  weekday = Column('scheduling_weekday',String(100))
  time = Column('scheduling_time',String(100))
  queue = Column('scheduling_queue',Boolean)
  terms = Column('scheduling_terms',Integer)
  status = Column('scheduling_status',Integer)
  patient_id = Column('scheduling_patient_id',Integer)
  clinic_id = Column('scheduling_clinic_id',Integer)
  specialties_id = Column('scheduling_specialties_id',Integer)
  
  def post(self, schedule):
    try:
      session = conn.session()
      session.add(schedule)
      session.commit()
      session.close()
      
      result = True
    except exc.IntegrityError:
      print(exc.IntegrityError)
      result = False
      pass
    
    return result

  def get(self):
    session = conn.session()
    data = session.query(Schedules).all()
    session.close()
    return data

  def fetch_all(self, query):
    stmt = conn.engine().connect()
    return [row for row in stmt.execute(query)]

  def update(self, scheduling_id, value):
    session = conn.session()
    session.query(Schedules).filter_by(scheduling_id = scheduling_id).update({'status': value})
    session.commit()
    session.close()

  def delete(self, scheduling_id):
    session = conn.session()
    obj = session.query(Schedules).filter_by(scheduling_id = scheduling_id).first()
    session.delete(obj)
    session.commit()
    session.close()



































