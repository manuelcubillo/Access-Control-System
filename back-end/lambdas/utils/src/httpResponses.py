"""
http static responses
"""
import os
import json

ACS_NOT_FOUND = 'NOT_FOUND' # status returned when object is not found
ACS_OK        = 'OK'        # status returned when everything is right

SOMETHING_WENT_WRONG = {
                'statusCode': 500,
                'headers': {
                    "Access-Control-Allow-Origin": os.environ.get('ALLOWED_ORIGINS')
                },
                'body': json.dumps({'Message': 'Something went wrong'})
            }

MALFORMED_REQUEST = {
                    'statusCode': 400,
                    'headers': {
                        "Access-Control-Allow-Origin": os.environ.get('ALLOWED_ORIGINS')
                    },
                    'body': json.dumps({'Message': 'Malformed request'})
                }

def getStatus200(body):
    return {
            "statusCode": 200,
            "headers": {
                     "Access-Control-Allow-Origin": os.environ.get('ALLOWED_ORIGINS')
                 },
            "body" : json.dumps(body)
        }
