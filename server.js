const express = require('express');
const app = express(); 
const hubspot = require('@hubspot/api-client')


// make api calls using a bearer token 
// get a token 
app.get('/v1/token', async(req, res) => {
    const hubspotClient = new hubspot.Client({ accessToken: "access_token" })
    try {
      const IdentificationTokenGenerationRequest = { email: "gob@example.com", firstName: "Gob", lastName: "Bluth" };
      const apiResponse = await hubspotClient.conversations.visitorIdentification.generateApi.generateToken(IdentificationTokenGenerationRequest);
      res.send(apiResponse)
    } catch (error) {
      res.send(error.response)
    }
})

app.listen(5001, () => console.log(`Server started on port 5001`));