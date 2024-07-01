class Flight():
    def __init__(self, capacity):
        self.capacity = capacity
        self.passangers = []

    def add_passanger(self, name):
        if not self.open_seats():
            return False
        else:
            self.passangers.append(name)
            return True

    def open_seats(self):
        return self.capacity - len(self.passangers) 

flight = Flight(3)

people = ["Harry", "Hermoine", "Ron", "Ginny"]

for person in people:
    if flight.add_passanger(person):
        print(f"Added {person} to flight successfully")
    else:
        print(f"Not available seats for {person}")