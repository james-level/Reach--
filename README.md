# Reach--

INSTRUCTIONS:

At base level of directory (Reach--):

sudo pip install Django

pip install Pillow

pip install django-registration

pip install django-registration-redux

pip install django-boostrap3

 [ cd into social ]

GENERAL INSTRUCTIONS AFTER REFACTORING MODELS AND ALTERING SEEDS:

python manage.py makemigrations

python manage.py migrate

python populate_social.py

GET IT UP AND RUNNING:

python manage.py runserver 8080

 [ open localhost:8080/social_reach/ ]
 
 TO CREATE ADMIN USER WITH ADMIN PRIVILEGES (python manage.py createsuperuser) 
 
 Then you'll be prompted to enter the username and password you want to user for your admin account.
