from math import sin, cos, sqrt, atan2, radians

# lat1 = radians(55.9493729)
# lon1 = radians(-3.181335)
# lat2 = radians(55.0009569)
# lon2 = radians(-1.6360795)
#
# dlon = lon2 - lon1
# dlat = lat2 - lat1
#
# a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
# c = 2 * atan2(sqrt(a), sqrt(1 - a))
#
# distance = R * c
#
# print("Distance:", distance)

def approximate_distance_between_two_points(lat1, long1, lat2, long2):

    # method for distance calculation
    # approximate radius of earth in km
    R = 6371

    lat1_rad = radians(lat1)
    long1_rad = radians(long1)
    lat2_rad = radians(lat2)
    long2_rad = radians(long2)

    dlong = long2_rad - long1_rad
    dlat = lat2_rad - lat1_rad

    a = sin(dlat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlong / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    return distance
