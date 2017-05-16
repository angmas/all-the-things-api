#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"
TOKEN=sfq0ufltW9uAO+05vdn7MaeHhJgwz8nbi4+tnUt6Ztg=--zZPhwwgVw01lUFGcFF/548jhcV4nnfT8nvNsemzgpfU=

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
