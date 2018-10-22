from math import sin, cos, sqrt, atan2, radians
# method for distance calculation
# approximate radius of earth in km
R = 6371.0

lat1 = radians(55.9493729)
lon1 = radians(-3.181335)
lat2 = radians(55.0009569)
lon2 = radians(-1.6360795)

dlon = lon2 - lon1
dlat = lat2 - lat1

a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
c = 2 * atan2(sqrt(a), sqrt(1 - a))

distance = R * c

print("Distance:", distance)
