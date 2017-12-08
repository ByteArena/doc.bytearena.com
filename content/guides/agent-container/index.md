---
Title: Agent container
Date: 2017-12-01
---

Every agent in Byte Arena runs isolated in its own Docker container.

A `Dockerfile` file is required at the root of your project in order to build your container and to deploy your agent.

## Sample Node.js Dockerfile

While your agent can be coded in whatever programming language you like, here is an example Dockerfile using the official Node.js (version 7) image:

```Dockerfile
FROM node:7
ENV NPM_CONFIG_LOGLEVEL error

# /usr/app is the root of our code in the container
WORKDIR /usr/app

# Bundle our source code in the container
COPY . /usr/app/

# Install dependencies
RUN npm install

# Build the source
RUN npm run build

# Tell Docker how to run our code
CMD [ "npm", "start" ]
```

As you can see, it's a pretty basic Dockerfile, bundling and compiling the source inside the container.

* These lines tell Docker to run our code inside a container featuring NodeJS 7, and sets to `error` the verbosity level for `npm`, the Node package manager

```Dockerfile
FROM node:7
ENV NPM_CONFIG_LOGLEVEL error
```

* We tell Docker that the commands of the Dockerfile will be executed in this folder.

```Dockerfile
WORKDIR /usr/app
```

* Our agent source code is copied inside the container, in `/usr/app`

```Dockerfile
COPY . /usr/app/
```

* We use `npm` to install the NPM dependencies of our agent inside the container

```Dockerfile
RUN npm install
```

* We then "build" the agent code, using Babel to transpile our ES6 code to ES5 code runnable by NodeJS.

```Dockerfile
RUN npm run build
```

* We finally tell Docker what command to issue to run our code when the container launches.

```Dockerfile
CMD [ "npm", "start" ]
```

## Environment variables passed to the container

These environment variables are set on agent containers by Byte Arena:

* `HOST`: the network host where the Byte Arena game server is running and reachable by the agent
* `PORT`: the port number where the agent must connect on the game server
* `AGENTID`: the agent random ID in use for the duration of a game

## Constraints on the container

### Network

In a container, network is restricted; agents are not be able to connect to the internet, or communicate directly with other agents.

The only network communications allowed are with the game server.

### Allowed Docker intructions

For security reason, you can only use the following instructions in your Dockerfile:

* `COPY`
* `ENV`
* `FROM`
* `RUN`
* `CMD`
* `ENTRYPOINT`
* `WORKDIR`

**All other Docker instructions are banned** (`VOLUME`, `PORT`, etc.). Your container won't be allowed on the online Byte Arena platform if your Dockerfile uses banned instructions.

### File system

The container uses a read-only ephemeral filesystem.

### Capabilities

All Unix Capabilities are dropped and your container is not privileged.

### Unix user

You are not allowed to change the Unix user or group which will execute your program.

The user `nobody` must be present in the container in order to run your program. Note that most Linux distribution have it out of the box.
