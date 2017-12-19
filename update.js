import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    // key defines partition key and sort key of item to Update
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment, attachkey = :attachkey",
    ExpressionAttributeValues: {
      ":attachment": data.attachment ? data.attachment : null,
      ":content": data.content ? data.content : null,
      ":attachkey": data.attachkey ? data.attachkey : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await(dynamoDbLib.call("update", params));
    callback(null, success({ status: true }));
  } catch(e) {
    callback(null, failure({ status: false }));
  }
}
