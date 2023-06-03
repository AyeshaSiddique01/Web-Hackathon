class Users :
    def __init__(self, UserID, FullName, Email, Password, PhoneNo) -> None:
        self.UserID = UserID
        self.FullName = FullName
        self.Email = Email
        self.Password = Password
        self.PhoneNo = PhoneNo

class EventCategies :
    def __init__(self, CatID, Tag) -> None:
        self.CatID = CatID
        self.Tag = Tag

class UserInterested :
    def __init__(self, UserInterestedID, UserId, CatId) -> None:
        self.UserInterestedID = UserInterestedID
        self.UserId = UserId
        self.CatId = CatId

class Events :
    def __init__(self, EventID, UserCreated, Title, Description, Poster, CatID, Capacity, Date, Time, Duration):
        self.EventID = EventID
        self.UserCreated = UserCreated
        self.Title = Title
        self.Description = Description
        self.Poster = Poster
        self.CatID =CatID
        self.Capacity =Capacity
        self.Date = Date
        self.Time = Time
        self.Duration = Duration

# class EventVenue :
#     def __init__(self, EventVenuID, , EventID) -> None:
#         self.EventVenuID = EventVenuID
        
#         self.EventID = EventID

class Participants :
    def __init__(self, ParticipantsID, UserPart, EventId, Status) -> None:
        self.ParticipantsID = Participants
        self.UserPart = UserPart
        self.EventId = EventId
        self.Status = Status

class WishList :
    def __init__(self, WishListID, UserID, EventId) -> None:
        self.WishListID = WishListID
        self.UserID = UserID
        self.EventId = EventId
