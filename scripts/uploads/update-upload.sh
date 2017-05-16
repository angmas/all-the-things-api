#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"
ID=591b5bb9efe5ed3b9a4c380f
TOKEN=TiCtFFrw0qW/z7T3flPcRGvF+keesJDtuRMxaL53MtU=--2MnJAxK+BQe6p0DbCHHcUApmk31elTUCYzc3ltedMvs=
TITLE="prarie-pic"



curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "upload": {
      "title": "'"${TITLE}"'",
      "tags": ["two","three","four"]
    }
  }'

echo

URL="google.com"

"url": "'"${URL}"'",
