import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "notes",
    // key defines partition key and sort key of item to Update
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    const result = await(dynamoDbLib.call("delete", params));
    callback(null, success({ status: true }));
  } catch(e) {
    callback(null, failure({ status: false }));
  }
}
