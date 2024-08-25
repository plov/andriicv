
import jwt
import datetime

# Define your secret key (used for HMAC algorithms like HS256)
SECRET_KEY = '9e5c3cc794c361a225d00dc463cc34a77a0a1c6e7a6bdb49c9a2a5e489cc5c85'

# Define the payload
payload = {
    'sub': '1234567890',  # Subject (user ID)
    'name': 'John Doe',
    'iat': datetime.datetime.utcnow(),  # Issued at
    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)  # Expiration time
}

# Generate the JWT
token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

print(token)