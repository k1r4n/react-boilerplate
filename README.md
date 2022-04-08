# Build Process

## Setting up docker (Build Environment)

Execute the following command to build a new docker image from the bundled Dockerfile

`docker build  -t react-boilerplate .`

This will create a new docker image with the name **react-boilerplate**.
Commands can be executed on this image using the following syntax

`docker run --rm -v $(pwd):/app -it react-boilerplate <command>`

## Installing dependencies

`docker run --rm -v $(pwd):/app -it react-boilerplate npm install`

This will install the dev dependencies as well as the project dependencies.

## Building the files

`docker run --rm -v $(pwd):/app -it react-boilerplate npm run build <flag>="<value>"`

This will create the build folder `/dist`.

The `npm build` command accepts the following options flags.

**api_root** = Mandatory option that specifies the api server endpoint.

## Running the application in development

Docker Compose has been set for the development.

The following command will setup the docker-compose.

`<flag>="<value>" docker-compose up`
