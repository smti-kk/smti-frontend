#!/usr/bin/env bash
HUB='harbor.cifra-k.ru'
PROJECT='telecom-it/telecom-frontend'

DIR="`dirname "$(readlink -f "$0")"`"

if [[ -z "${hub}" ]]; then
  hub=$HUB
fi

if [[ -z "${project}" ]]; then
  project=$PROJECT
fi

if [[ -z "${GIT_BRANCH_SHORT}" ]]; then
  GIT_BRANCH_SHORT=`git symbolic-ref --short HEAD | tr '[:upper:]' '[:lower:]'`
fi

if [[ -z "${GIT_COMMIT_SHORT}" ]]; then
  GIT_COMMIT_SHORT=`git rev-parse --short HEAD | tr '[:upper:]' '[:lower:]'`
fi


build() {
echo "Building ${hub}/${project} (${GIT_BRANCH_SHORT}) at ${GIT_COMMIT_SHORT}"

echo "[ ${GIT_COMMIT_SHORT} ] ${GIT_BRANCH_SHORT}" > ${DIR}/revision

docker build \
  -t ${hub}/${project}_${GIT_BRANCH_SHORT}:`cat ${DIR}/version` \
  -t ${hub}/${project}_${GIT_BRANCH_SHORT}:latest \
  -t ${hub}/${project}:${GIT_COMMIT_SHORT} \
  -f ${DIR}/Dockerfile ${DIR}/..
}

clean() {
echo "Cleaning ${hub}/${project} (${GIT_BRANCH_SHORT}) at ${GIT_COMMIT_SHORT}"

docker rmi ${hub}/${project}_${GIT_BRANCH_SHORT}:`cat ${DIR}/version`
docker rmi ${hub}/${project}_${GIT_BRANCH_SHORT}:latest
docker rmi ${hub}/${project}:${GIT_COMMIT_SHORT}
}

push() {
echo "Pushing ${hub}/${project} (${GIT_BRANCH_SHORT}) at ${GIT_COMMIT_SHORT}"

docker push ${hub}/${project}_${GIT_BRANCH_SHORT}:`cat ${DIR}/version`
docker push ${hub}/${project}_${GIT_BRANCH_SHORT}:latest
docker push ${hub}/${project}:${GIT_COMMIT_SHORT}
}

dump() {
docker save ${hub}/${project}_${GIT_BRANCH_SHORT}:latest > ${project}.tar
}


$1
