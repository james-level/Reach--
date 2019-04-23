# Reach

Clone repo

pip install

GET IT UP AND RUNNING:

python manage.py runserver 8080

 [ open localhost:8080/social_reach/ ]

 TO CREATE ADMIN USER WITH ADMIN PRIVILEGES (python manage.py createsuperuser)

 Then you'll be prompted to enter the username and password you want to use for your admin account.

 [ Navigate to localhost:8080/admin/  to manage the app's database and delete users etc ]

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

CONVERT SQLITE TO PSQL:

pip install django psycopg2 (among others)

in settings.py, change DATABASES = ... to the following:

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'USER': 'reach22',
        'PASSWORD': 'insert-password-here',
        'NAME': 'reach',
        'HOST': 'localhost',
        'PORT': '',
    }
}

Then...

createdb reach

psql -d reach

CREATE USER reach22 WITH PASSWORD 'INSERT PASSWORD HERE';

python manage.py makemigrations
python manage.py migrate


IF THERE ARE SERVERS RUNNING:

{
pg_ctl -D /usr/local/var/postgres stop -s -m fast

pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
}

python manage.py dbshell

TRUNCATE django_content_type CASCADE;

python manage.py dumpdata dump.json

python manage.py loaddata dump.json

Now the data is stored in a PSQL database.


FRONTEND (REACT):

npm install

  <b>VERY IMPORTANT: If it says a .pyc file has been staged when doing a git commit, undo immediately and run python python-cache-flusher.py. DON'T PUSH!<b>
