import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CognitoErrorManagerService {

  constructor() { }
  getErrorMessage(error:string){
  	switch(error){
  		case "CodeDeliveryDetails":
  		break;
 
  	}
  	/*CodeDeliveryDetails
	The code delivery details returned by the server response to the user registration request.

	Type: CodeDeliveryDetailsType object

UserConfirmed
A response from the server indicating that a user registration has been confirmed.

Type: Boolean

UserSub
The UUID of the authenticated user. This is not the same as username.

Type: String

Errors
For information about the errors that are common to all actions, see Common Errors.

CodeDeliveryFailureException
This exception is thrown when a verification code fails to deliver successfully.

HTTP Status Code: 400

InternalErrorException
This exception is thrown when Amazon Cognito encounters an internal error.

HTTP Status Code: 500

InvalidEmailRoleAccessPolicyException
This exception is thrown when Amazon Cognito is not allowed to use your email identity. HTTP status code: 400.

HTTP Status Code: 400

InvalidLambdaResponseException
This exception is thrown when the Amazon Cognito service encounters an invalid AWS Lambda response.

HTTP Status Code: 400

InvalidParameterException
This exception is thrown when the Amazon Cognito service encounters an invalid parameter.

HTTP Status Code: 400

InvalidPasswordException
This exception is thrown when the Amazon Cognito service encounters an invalid password.

HTTP Status Code: 400

InvalidSmsRoleAccessPolicyException
This exception is returned when the role provided for SMS configuration does not have permission to publish using Amazon SNS.

HTTP Status Code: 400

InvalidSmsRoleTrustRelationshipException
This exception is thrown when the trust relationship is invalid for the role provided for SMS configuration. This can happen if you do not trust cognito-idp.amazonaws.com or the external ID provided in the role does not match what is provided in the SMS configuration for the user pool.

HTTP Status Code: 400

NotAuthorizedException
This exception is thrown when a user is not authorized.

HTTP Status Code: 400

ResourceNotFoundException
This exception is thrown when the Amazon Cognito service cannot find the requested resource.

HTTP Status Code: 400

TooManyRequestsException
This exception is thrown when the user has made too many requests for a given operation.

HTTP Status Code: 400

UnexpectedLambdaException
This exception is thrown when the Amazon Cognito service encounters an unexpected exception with the AWS Lambda service.

HTTP Status Code: 400

UserLambdaValidationException
This exception is thrown when the Amazon Cognito service encounters a user validation exception with the AWS Lambda service.

HTTP Status Code: 400

UsernameExistsException
This exception is thrown when Amazon Cognito encounters a user name that already exists in the user pool.

HTTP Status Code: 400*/
  }
}
