hub = harbor.cifra-k.ru
version = 1.2.0

IMAGE_NAME = $(hub)/telecom_monitoring/frontend:$(version)

.PHONY: all clean install uninstall

all: build

build:
	docker build -t $(IMAGE_NAME) -f docker/Dockerfile .

clean:
	docker rmi $(IMAGE_NAME)

export:
	docker push $(IMAGE_NAME)

backup:
	docker save $(IMAGE_NAME) > frontend.tar

restore:
	docker load < frontend.tar

run:
	docker run --rm -p 0.0.0.0:8080:80/tcp $(IMAGE_NAME)
