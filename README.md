CacheCleaner - Makes Akamai purge requests
============
Uses Mongo to save request data.

```
Setup:
Install Node
Start a Mongo instance at the default port 27017
From project root directory
  npm install 
  npm start
```

Currently makes purge request on a test url over Akamai staging network
http://path-to-page.com

```
Place the Akamai API credentials in the .edgerc file under project root directory with below format
[diag-api]
host =  .luna.akamaiapis.net/
client_token = XXXXXXXXXX
client_secret = XXXXXXXXXX
access_token = XXXXXXXXXX
max-body = 131072

[purge-api]
host =  XXXXXXXXXX.purge.akamaiapis.net/
client_token = XXXXXXXXXX
client_secret = XXXXXXXXXX
access_token = XXXXXXXXXX
max-body = 131072
```

Request a purge:
localhost:3000/purge

Status of the purge:
http://localhost:3000/purge/status/<<purge-Id>purge-Id>

Data Endpoints for a dashboard:<br/>
http://localhost:3000/purge/requests/Done<br/>
http://localhost:3000/purge/requests/In-Progress<br/>
http://localhost:3000/purge/requests/All

```
Data Format for status dashboard:
{
  "_id": "XXXXXXXXXXXXXXXXXX",
  "estimatedSeconds": 240,
  "progressUri": "/ccu/v2/purges/XXXXXXXXXXXXXXXXXX",
  "purgeId": "XXXXXXXXXXXXXXXXXX",
  "supportId": "XXXXXXXXXXXXXXXXXX",
  "httpStatus": 201,
  "detail": "Request accepted.",
  "pingAfterSeconds": 240,
  "purgeStatus": "Done",
  "completionTime": "YYYY-MM-DDTHH:MM:SSZ",
  "submissionTime": "YYYY-MM-DDTHH:MM:SSZ"
}
```
