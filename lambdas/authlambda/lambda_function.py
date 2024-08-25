import json
import jwt

JWT_SECRET = '9e5c3cc794c361a225d00dc463cc34a77a0a1c6e7a6bdb49c9a2a5e489cc5c85'
JWT_ALGORITHM = 'HS256'

def lambda_handler(event, context):
    token = event.get('authorizationToken')
    
    if not token:
        raise Exception('Unauthorized')

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        
        principal_id = payload['sub']
        policy_document = generate_policy(principal_id, 'Allow', event['methodArn'])
        
        context = {
            'user_id': payload['sub'],
            'email': payload.get('email')
        }
        
        return {
            'principalId': principal_id,
            'policyDocument': policy_document,
            'context': context
        }
        
    except jwt.ExpiredSignatureError:
        raise Exception('Unauthorized: Token is expired')
    except jwt.InvalidTokenError:
        raise Exception('Unauthorized: Invalid token')

def generate_policy(principal_id, effect, resource):
    policy_document = {
        'Version': '2012-10-17',
        'Statement': [
            {
                'Action': 'execute-api:Invoke',
                'Effect': effect,
                'Resource': resource
            }
        ]
    }
    
    return policy_document