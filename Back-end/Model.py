from ViewClasses import *
import psycopg2  # pip install psycopg2


class model:
    def __init__(self, db, host, user,password, port):
        self.connection = None
        self.database=db,  # write your Dbname
        self.host=host,
        self.user=user,
        self.password=password,  # write your dbPassword
        self.port=port
        try:
            self.connection = psycopg2.connect(
                database=self.database,  # write your Dbname
                host=self.host,
                user=self.user,
                password=self.password,  # write your dbPassword
                port=self.port)
        except Exception as e:
            print(str(e))

    def __del__(self):
        if self.connection != None:
            self.connection.close()

    def InsertUser(self, std):
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                query = f'''insert into public.student(name,roll_no,cgpa,city,country,semester) 
	                        values ('{std.name}', '{std.roll_no}','{std.cgpa}', '{std.city}', '{std.country}', '{std.semester}'');
                            '''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in insertExaminer", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()
