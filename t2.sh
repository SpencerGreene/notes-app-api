#!/bin/bash -x
apig-test \
--username='admin@example.com' \
--password='Passw0rd!' \
--user-pool-id='us-west-2_My3D9CdYA' \
--app-client-id='5kjlm8l27elvpjnmdg5dreqsg3' \
--cognito-region='us-west-2' \
--identity-pool-id='us-west-2:8b204151-ed59-4e17-b3cc-484ab5d03123' \
--invoke-url='https://gix05r7yk3.execute-api.us-west-2.amazonaws.com/prod' \
--api-gateway-region='us-west-2' \
--path-template='/notes' \
--method='GET' 
