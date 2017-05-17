#!/bin/bash

API="http://localhost:4741"
URL_PATH="/allusers"
TOKEN="WrUA/kSAglnHjGkfDSPoTglGJgYNa1J/o0eV3fcPpmo=--kwuEqsdA1rPfIKw2UREgKCAJidBxMXaNrzhaTloFbNc="
curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
