#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"
TOKEN=9PzDFUFD0g9qtXXOejzIibmTGyhzaYMO22BgUcFIyOI=--1/hWZ6i3xENASPkP3jkzdZWMkUORGWaaRq+JpaxzEFM=

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
