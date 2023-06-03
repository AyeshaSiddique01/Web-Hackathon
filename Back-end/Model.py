from ViewClasses import *
import pymysql


class model:
    # constructor
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None
        # cursor = None
        try:
            self.connection = pymysql.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
            )
        except Exception as e:
            print("There is error in connection", str(e))

    # Destructor
    def __del__(self):

        if self.connection != None:
            self.connection.close()
    # for log in
    def checkUserExist(self, email):
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                cursor.execute(f"select Email from Users;")
                emailList = cursor.fetchall()
                for e in emailList:
                    if email == e[0]:
                        return True
                return False
        except Exception as e:
            print("Exception in checkUserExist", str(e))
        finally:
            if cursor != None:
                cursor.close()

    # validate Password For log in
    def validatePassword(self, email_, password_):
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                cursor.execute(f"select Password, userId from Users where Email = '{email_}';")
                password = cursor.fetchall()
                if password_ == password[0][0]:
                    return password[0][1]
                return -1
        except Exception as e:
            print("Exception in validatePassword", str(e))
            return -1
        finally:
            if cursor != None:
                cursor.close()

    def getUserID(self, email) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                query = f'''select userId from Users where email = '{email}';'''
                cursor.execute(query)
                data = cursor.fetchall()
                return data[0][0]
            else:
                return -1
        except Exception as e:
            print("Exception in insertUser", str(e))
            return -1
        finally:
            if cursor != None:
                cursor.close()
    # for signUp
    def insertUser(self, user):
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                query = f'''insert into Users (fullName, email, password, phoneNo) values ('{user.FullName}','{user.Email}','{user.Password}','{user.PhoneNo}');'''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in insertUser", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    def AddInterest(self, user_id, cat_id) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()              
                query = f'''insert into UserInterested (userId, catId) values ({user_id}, {cat_id});'''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in insertCategory", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    # Insert new category
    def insertCategory(self, tag):
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()              
                query = f'''insert into EventCategies (Tag) values ("{tag}");'''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in insertCategory", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    def getCategories(self):
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                cursor.execute(f"select Tag from EventCategies;")
                data = cursor.fetchall()
                return data
        except Exception as e:
            print("Exception in search: ", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    # Insert new Event
    def insertEvent(self, event):
        cursor = None
        event = Events()
        try:
            if self.connection != None:
                cursor = self.connection.cursor()              
                query = f'''insert into Events (UserCreated, Title, Description, Poster, CatID, Capacity, Date, Time, Duration) values({event.UserCreated}, '{event.Title}', '{event.Description}', '{event.Poster}', {event.CatID}, {event.Capacity},{event.Date}, '{event.Time}', '{event.Duration}');'''
                cursor.execute(query)
                self.connection.commit()
                query = f'''select EventID from Events where Title = '{event.Title}' and Description = '{event.Description}' and UserCreated = '{event.UserCreated}' and CatID = {event.CatID};'''
                cursor.execute(query)
                data = cursor.fetchall()
                return data[0][0]
            else:
                return -1
        except Exception as e:
            print("Exception in insertEvent", str(e))
            return -1
        finally:
            if cursor != None:
                cursor.close()

    # Insert new EventVenue
    # def insertEventVenu(self, eventVen):
    #     cursor = None
    #     try:
    #         if self.connection != None:
    #             cursor = self.connection.cursor()              
    #             query = f'''insert into EventVenue (Date, Time, Duration, EventID) values({eventVen.Date}, '{eventVen.Time}', '{eventVen.Duration}', {eventVen.EventID});'''
    #             cursor.execute(query)
    #             self.connection.commit()
    #             return True
    #         else:
    #             return False
    #     except Exception as e:
    #         print("Exception in insertEventVenue", str(e))
    #         return False
    #     finally:
    #         if cursor != None:
    #             cursor.close()

    def deleteEvent(self, event_id):
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                query = f"delete from Events where EventID = {event_id};"
                cursor.execute(query)
                self.connection.commit()                
                return True
            else:
                return False
        except Exception as e:
            print("Exception in deleteEvent", str(e))
            return False
        finally:
            if cursor:
                cursor.close()
        
    def AddParticipant(self, part) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()              
                query = f'''insert into Participants (userPart, eventId, status) values({part.UserPart}, {part.EventId}, '{part.Status}';'''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in AddParticipant", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    def search(self, searchBy, value) :  # Title/Description/CatID/EventID
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                cursor.execute(f"select * from Events where {searchBy} = '{value}';")
                data = cursor.fetchall()
                return data
        except Exception as e:
            print("Exception in search: ", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    def searchByDate(self, date) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                cursor.execute(f"select EventID from EventVenue where Date = '{date}';")
                data = cursor.fetchall()
                cursor.execute(f"select * from Events where EventID = '{date[0][0]}';")
                data = cursor.fetchall()
                return data
        except Exception as e:
            print("Exception in searchByDate: ", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    def ConfirmEvent(self, p_id, status) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                query = f'''update Participants set status = '{status}' where  participantsId = {p_id};'''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in updateEvent", str(e))
            return False
        finally:
            if cursor:
                cursor.close()

    def updateEvent(self, event, eventVenue) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                query = f'''update Events set Title = {event.Title}, Description = {event.Description}, Poster = '{event.Poster}' where  EventID = {event.EventID};'''
                cursor.execute(query)
                self.connection.commit()  
                query = f'''update EventVenue set Date = {eventVenue.Date}, Time = {eventVenue.Time}, Duration = '{eventVenue.Duration}' where  EventVenuID = {eventVenue.EventVenuID};'''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in updateItem", str(e))
            return False
        finally:
            if cursor:
                cursor.close()

    def getEventsOfOthers(self, user_id) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                cursor.execute(f"select Events.Title, Events.Description, Events.Poster, Events.Date, Events.Time, Events.Duration, EventCategies.Tag from Events, EventCategies where Events.CatID = EventCategies.CatID AND UserCreated != {user_id} order by Events.Capacity, Events.Date;")
                data = cursor.fetchall()
                return data
        except Exception as e:
            print("Exception in get events: ", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()
    
    def InsertWishList(self, wish) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()              
                query = f'''insert into WishList (UserID, EventID) values({wish.UserID}, {wish.EventId});'''
                cursor.execute(query)
                self.connection.commit()
                return True
            else:
                return False
        except Exception as e:
            print("Exception in InsertWishList", str(e))
            return False
        finally:
            if cursor != None:
                cursor.close()

    def RemoveFromWishList(self, wishID) :
        cursor = None
        try:
            if self.connection != None:
                cursor = self.connection.cursor()
                query = f"delete from WishList where WishListID = {wishID};"
                cursor.execute(query)
                self.connection.commit()                
                return True
            else:
                return False
        except Exception as e:
            print("Exception in RemoveFromWishList", str(e))
            return False
        finally:
            if cursor:
                cursor.close()
