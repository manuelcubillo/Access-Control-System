import os
import json
import configparser
import boto3
from boto3.dynamodb.conditions import Key, Attr
from utils import checkNotEmptyBody, getBodyContent
from httpResponses import SOMETHING_WENT_WRONG, MALFORMED_REQUEST, getStatus200
from idGenerator import generateNewId

def handler(event, context):
    config = configparser.ConfigParser()
    config.read('config.cfg')
    print("Event: ", json.dumps(event)) 
    print("RUNNING ", os.environ.get('STAGE'), " STAGE")
    dynamodb = boto3.resource('dynamodb')
    
    #cognitoClient = boto3.client('cognito-idp')

    # check request and get body
    checkBody = checkNotEmptyBody(event)
    if not checkBody:
        return checkBody # return status 400 malformed message

    receivedBody = getBodyContent(event)

    # get users table
    usersTable = dynamodb.Table(os.environ.get('USERS_CORE_TABLE_NAME'))

    # check mandatory fields
    if not 'properties' in receivedBody:
        return MALFORMED_REQUEST

    if not 'id' in receivedBody:
        receivedBody['id'] = generateNewId()

    # build object
    user = {
        'id' : receivedBody['id'],
        'properties': receivedBody['properties']
    }
    
    try:
        # add item to db
        dynamoResponse = usersTable.put_item(Item = user)

        return getStatus200(dynamoResponse) # everythinh right, response with status code 200

    except:
        print('Error updating db')
        print('msg sent', json.dumps(user))
        return SOMETHING_WENT_WRONG
