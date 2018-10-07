from access_tokens import facebook_app_token , facebook_access_token



facebook = OpenFacebook(facebook_access_token)

# Getting info about me
facebook.get('me')
#
# # Learning some more about fashiolista
# facebook.get('fashiolista')
#
# # Writing your first comment
# facebook.set('fashiolista/comments', message='I love Fashiolista!')
#
#
# # Posting to a users wall
# facebook.set('me/feed', message='check out fashiolista',
#              url='http://www.fashiolista.com')
#
# # Liking a page
# facebook.set('fashiolista/likes')
#
# # Getting who likes cocacola
# facebook.set('cocacola/likes')
#
# # Use fql to retrieve your name
# facebook.fql('SELECT name FROM user WHERE uid = me()')
#
# # Executing fql in batch
# facebook.batch_fql([
#     'SELECT uid, name, pic_square FROM user WHERE uid = me()',
#     'SELECT uid, rsvp_status FROM event_member WHERE eid=12345678',
# ])

# # Uploading pictures
# photo_urls = [
#     'http://e.fashiocdn.com/images/entities/0/7/B/I/9/0.365x365.jpg',
#     'http://e.fashiocdn.com/images/entities/0/5/e/e/r/0.365x365.jpg',
# ]
# for photo in photo_urls:
#     print facebook.set('me/feed', message='Check out Fashiolista',
#                        picture=photo, url='http://www.fashiolista.com')
