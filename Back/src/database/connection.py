from sqlalchemy import create_engine
from sqlalchemy.orm import Session

DATABSE_URI='mysql+mysqlconnector://{user}:{password}@{server}/{database}'

class Connetcions():

  def engine(self):
    return create_engine(DATABSE_URI.format(user='admin', password='Rdz!948Fbdyr', server='database-1.cynvvbebz0gb.sa-east-1.rds.amazonaws.com', database='healthlab'))

  def session(self):
    engine = self.engine()
    return Session(bind=engine)