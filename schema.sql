create database Dynamic_Event_Schedule;
use Dynamic_Event_Schedule;

DROP TABLE IF EXISTS `WishList`;
DROP TABLE IF EXISTS `Participants`;
DROP TABLE IF EXISTS `EventVenue`;
DROP TABLE IF EXISTS `Events`;
DROP TABLE IF EXISTS `UserInterested`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `EventCategies`;


CREATE TABLE IF NOT EXISTS `EventCategies`(
`CatID` INT PRIMARY KEY AUTO_INCREMENT,
`Tag` VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Users`(
`userId` INT PRIMARY KEY AUTO_INCREMENT,
`fullName` VARCHAR(30) NOT NULL,
`email` VARCHAR(30) NOT NULL,
`password` VARCHAR(30) NOT NULL,
`phoneNo` VARCHAR(100) NOT NULL,
CONSTRAINT unq_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS `UserInterested`(
`userInterestedID` INT PRIMARY KEY AUTO_INCREMENT,
`userId` INT NOT NULL,
`catId` INT NOT NULL,
CONSTRAINT fk_UserInterest FOREIGN KEY(userId) REFERENCES Users(userId) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_CateInterest FOREIGN KEY(catId) REFERENCES EventCategies(catId) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `Events`(
`EventID` INT PRIMARY KEY AUTO_INCREMENT,
`UserCreated` int NOT NULL,
`Title` VARCHAR(30) NOT NULL,
`Description` VARCHAR(30) NOT NULL,
`Poster` VARCHAR(100) NOT NULL,
`Capacity` INT NOT NULL,
`Date` Date NOT NULL,
`Time` VARCHAR(100) NOT NULL,
`Duration` VARCHAR(100) NOT NULL,
`CatID` INT NOT NULL,
`Recursive` BOOLEAN NOT NULL,
CONSTRAINT fk_UserCreated FOREIGN KEY(UserCreated) REFERENCES Users(UserID) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_CatID FOREIGN KEY(CatID) REFERENCES EventCategies(CatID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- create TABLE IF NOT EXISTS `EventVenue` (
-- `EventVenuID` INT PRIMARY KEY AUTO_INCREMENT,

-- `EventID` INT NOT NULL,
-- CONSTRAINT fk_EventVen FOREIGN KEY(EventID) REFERENCES Events(EventID) ON UPDATE CASCADE ON DELETE CASCADE
-- );

CREATE TABLE IF NOT EXISTS `Participants`(
`participantsId` INT PRIMARY KEY AUTO_INCREMENT,
`userPart` INT NOT NULL,
`eventId` INT NOT NULL,
`status` VARCHAR(20) NOT NULL,
CONSTRAINT fk_UserPart FOREIGN KEY(userPart) REFERENCES Users(userId) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_EventPart FOREIGN KEY(eventId) REFERENCES Events(eventId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `WishList`(
`WishListID` INT PRIMARY KEY AUTO_INCREMENT,
`UserID` INT NOT NULL,
`EventId` INT NOT NULL,
CONSTRAINT fk_UserWish FOREIGN KEY(UserID) REFERENCES Users(UserID) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_EventWish FOREIGN KEY(EventID) REFERENCES Events(EventID) ON UPDATE CASCADE ON DELETE CASCADE
);
