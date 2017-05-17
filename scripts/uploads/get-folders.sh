#!/bin/sh

API="http://localhost:4741"
URL_PATH="/folders"
TOKEN="OuDtsQiR9Gcl+3IdRP+Qy2VPPTIS7ykCGgdwTmttahU=--iwFGFOLmLqgHDAs+hYKNA864zO5ulzOP3RLfyiDjJ/8="
ID=591c58cdc62a9e09239ebc89
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
