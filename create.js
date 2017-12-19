import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  // request body is passed in as a json encoded string in event.body
  const data = JSON.parse(event.body);

  const params = {
    TableName: "notes",
    // Item contains attributes of item to be created
    // - userId: user identities are federated through Cognito Identity Pool,
    //           we will use the identity id as the userid of the auth'd user
    // - noteId: a unique uuid
    // - content: parsed from request body
    // - attachment: parsed from request body
    // cratedAt: current unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      attachkey: data.attachkey,
      createdAt: new Date().getTime()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch(e) {
    callback(null, failure({ status: false}));
  }
}
