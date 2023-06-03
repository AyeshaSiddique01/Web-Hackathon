class student :
    def __init__(self, name, roll_no, cgpa, semester, city, country) -> None:
        self.name = name
        self.roll_no = roll_no
        self.cgpa = cgpa
        self.semester = semester
        self.city = city
        self.country = country
    
    def __str__(self) -> str:
        return f'''Name: {self.name},
                    Roll No: {self.roll_no},
                    cgpa: {self.cgpa},
                    semester: {self.semester},
                    city: {self.city},
                    country: {self.country}'''
    
class user :
    def __init__(self, name, email, password) -> None:
        self.name = name
        self.email = email
        self.password = password

    def __str__(self) -> str:
        return(f'''Name: {self.name}
               Email: {self.email}
               Password: {self.password}''')