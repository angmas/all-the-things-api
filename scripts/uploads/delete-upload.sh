
API="http://localhost:4741"
URL_PATH="/uploads"
ID=591b388fafc10523b3efee8d
TOKEN=sfq0ufltW9uAO+05vdn7MaeHhJgwz8nbi4+tnUt6Ztg=--zZPhwwgVw01lUFGcFF/548jhcV4nnfT8nvNsemzgpfU=

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"
