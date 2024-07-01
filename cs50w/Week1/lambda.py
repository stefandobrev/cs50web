people = [
    {"name": "Harry", "house": "Gryffindor"}, 
    {"name": "Cho", "house": "Ravenclaw"}, 
    {"name": "Drako", "house": "Slytherin"}
]

def f(person):
    return person["name"]

people.sort(key=f)

print(people)