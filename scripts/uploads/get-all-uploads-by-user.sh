#!/bin/sh

API="http://localhost:4741"
URL_PATH="/useruploads"
TOKEN=94ZSxaB0HbzYGlMEzI5dfaEies6wK+eVCfE/h+47TQk=--hiDryAcKyVnd1hVPQ/y999kXreF2jJcXtIM/p+S6vfA=
ID=591c58cdc62a9e09239ebc89
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
