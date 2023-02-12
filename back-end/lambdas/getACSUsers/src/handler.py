import os
import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from utils import checkNotEmptyBody, getBodyContent
from httpResponses import SOMETHING_WENT_WRONG, MALFORMED_REQUEST, getStatus200, ACS_OK, ACS_NOT_FOUND
from idGenerator import generateNewId

def handler(event, context):
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


    try:
        if 'id' in receivedBody:
            print('starting searching by id ', receivedBody['id'])
            dynamoResponse = usersTable.get_item(Key={'id': receivedBody['id']})
            if not 'Item' in dynamoResponse:
                print('No item found')
                return getStatus200({'acs_status': ACS_NOT_FOUND})
            print(json.dumps(dynamoResponse))
            response = dynamoResponse['Item']

        else:
            print('starting fetching all data')
            dynamoResponse = usersTable.scan()
            print(json.dumps(dynamoResponse))
            response = dynamoResponse['Items']
            # todo possible filter

        response['acs_status'] = ACS_OK
        return getStatus200(response) # everythinh right, response with status code 200

    except Exception as err:
        print('Error fetching db')
        if 'response' in err:
            print(err.response['Error']['Code'], err.response['Error']['Message'])
        return SOMETHING_WENT_WRONG
