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

  <b>VERY IMPORTANT: If it says a .pyc file has been staged when doing a git commit, undo immediately and run python python-cache-flusher.py. DON'T PUSH!<b>
