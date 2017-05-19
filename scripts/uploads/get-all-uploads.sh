#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"
TOKEN="zhClMN/LSSX6sZ8M8Hhu0Et4OfOf7dcijh8CousDQLY=--ypuVTq9D8e7imcIElVLNOT62wFB0yhmwHdxI82oLOt4="

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
