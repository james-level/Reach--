# Reach 

Clone repo onto your machine.

INSTRUCTIONS:

At base level of directory (Reach):

sudo pip install Django

pip install Pillow

pip install django-registration

pip install django-registration-redux

pip install django-bootstrap3

 [ cd into social ]

GENERAL INSTRUCTIONS AFTER REFACTORING MODELS AND ALTERING SEEDS:

python manage.py makemigrations (only necessary if you've changed models.py)

python manage.py migrate (only necessary if you've changed models.py)

python populate_social.py (seeds DB = ESSENTIAL after cloning)

GET IT UP AND RUNNING:

python manage.py runserver 8080

 [ open localhost:8080/social_reach/ ]

 TO CREATE ADMIN USER WITH ADMIN PRIVILEGES (python manage.py createsuperuser)

 Then you'll be prompted to enter the username and password you want to use for your admin account.

 [ Navigate to localhost:8080/admin/  to manage the app's database and delete users etc ]

 INSTALLING BEAUTIFUL SOUP:

 pip install requests bs4
 
 INSTALLING REST FRAMEWORK AND AUTHENTICATION:
 
 pip install djangorestframework
 
 pip install djangorestframework-simplejwt
 
 INITIAL ENDPOINTS FOR OUR REST API (you need to be logged into Reach to view the response; change port number if need be):
 
 Get all user profiles or create a profile: http://localhost:8080/social_reach/profiles/
 
 View/update/delete specific user profile: http://localhost:8080/social_reach/profiles/{id}
 
 Get all users or create a user: http://localhost:8080/social_reach/users/
 
 View/update/delete specific user: http://localhost:8080/social_reach/users/{id}
 
 Get all likes or create a like: http://localhost:8080/social_reach/likes/
 
 View/update/delete specific like: http://localhost:8080/social_reach/likes/{id}
 
 Get all matches or create a match: http://localhost:8080/social_reach/mutual_likes/
 
 View/update/delete specific match: http://localhost:8080/social_reach/mutual_likes/{id}
 
 Get all photo categories: http://localhost:8080/social_reach/categories/
 
 FOR JSON RESPONSE (e.g. profiles): http://localhost:8080/social_reach/profiles/?format=json

 INSTALLING SOCIAL AUTHENTICATION:
 
 pip install social-auth-app-django
 
 CORS (Cross origin resource sharing):
 
 pip install django-cors-headers
 
 REST FRAMEWORK AUTHENTICATION VIEWS:
 
 pip install coreapi
 
 DJANGO REGISTRATION AUTHENTICATION:
 
 pip install django-rest-auth
 
 pip install django-allauth
 
 DJOSER
 
 pip install djoser
 
 FRONTEND (REACT):
 
 npm run build (possibly)
 
 npm start

  <b>VERY IMPORTANT: If it says a .pyc file has been staged when doing a git commit, undo immediately and run python python-cache-flusher.py. DON'T PUSH!<b>
