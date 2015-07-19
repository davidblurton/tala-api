eval "$(boot2docker shellinit)"
docker build -t davidblurton/tala-api . && docker push davidblurton/tala-api
