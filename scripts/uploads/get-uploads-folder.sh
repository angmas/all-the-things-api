#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads/folder"
TOKEN="OuDtsQiR9Gcl+3IdRP+Qy2VPPTIS7ykCGgdwTmttahU=--iwFGFOLmLqgHDAs+hYKNA864zO5ulzOP3RLfyiDjJ/8="
FOLDER="05-16-2017"
ID=591c58cdc62a9e09239ebc89
curl "${API}${URL_PATH}/${FOLDER}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
