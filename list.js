import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "notes",
    // KeyConditionExpression defines condition for Query
    // userId = :userId only returns items with matching partition key
    // ExpressionAttributeValues defines value in condition
    // :userid defines userId to be identity pool identity of auth users
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result.Items));
  } catch(e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
