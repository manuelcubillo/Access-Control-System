import os
import json


"""
static functions used around the project
"""

def checkNotEmptyBody(event) -> bool:
    """
    check body content
    if it is not right return the request
    """
    print('Checking body...')

    # not apply this check to local dev
    stage = os.environ.get('STAGE')
    if stage == 'local':
        return True


    if event['body'] == None:
        return {
            'statusCode': 400,
            'headers': {
                "Access-Control-Allow-Origin": os.environ.get('ALLOWED_ORIGINS')
            },
            'body': json.dumps({'Message': 'Malformed request'})
        }

    return True

def getBodyContent(event):
    """
    check stage to return the right body
    """

    if 'body' in event:
        payload = json.loads(event['body']) # print event
    else:
        payload = event 

    return payload


