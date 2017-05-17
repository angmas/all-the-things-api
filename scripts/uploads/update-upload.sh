#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"
ID=591c93de32c5321900af10e2
TOKEN=q+7S2gbKTvLtvXWWKOWxwEgvZXFPbpIGh3BS3fpSTrI=--iJ7BsKfxDLTuXNP3X4uc+LiVq1NmaRMoZx9ipUsWYss=
TITLE="english-muffin"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "upload": {
      "title": "'"${TITLE}"'"
    }
  }'

echo
