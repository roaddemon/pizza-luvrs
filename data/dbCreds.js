
async function getCredentials () {

    // Load the AWS SDK
    var AWS = require('aws-sdk'),
    secretName = "pizza-db-secret",
    secret,
    decodedBinarySecret;

    // Create a Secrets Manager client
    var client = new AWS.SecretsManager({
        region: "us-east-1"
    });


    console.log("calling getSecretValue");

    var secretResponse = await client.getSecretValue({SecretId: secretName}).promise();
    console.log(secretResponse.SecretString);
    return secretResponse.SecretString;
  }
  
  module.exports = {
    getCredentials
  }
  