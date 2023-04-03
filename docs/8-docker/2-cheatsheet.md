# CheatSheet

## Overview
- docker image (class/interface)
    - docker container (object)
## Image
- image related
    - docker images
    - docker image ls/rm
- how to find Docker image
    - from registry
        - `docker pull <Name>`
    - from dockfile
        - DockFile
        - docker build
```shell=
docker build -t="${tag name}" .
docker build .
```
- DockerFile
    - https://www.jinnsblog.com/2018/12/docker-dockerfile-guide.html
    - https://peihsinsu.gitbooks.io/docker-note-book/content/docker-build.html
- Docker Container
    - `docker container create <docker image name>`
    - `docker container ls (-a)`
    - `docker container rm <container id>`
    - `docker container start <container name> (<sh -c "command">)`
    - `docker container run <container name> -d (相當於 create + start)`


## Docker-Compose
- docker-compose.yaml    
- docker-compose up -d
- docker-compose ps
- docker-compose

## Ref
- [cheat-sheet](https://swissarmydevops.com/wp-content/uploads/2020/11/Docker_Cheat_Sheet-1.pdf)
- [Docker Network參考網址](https://hwchiu.com/docker-network-model.html)
