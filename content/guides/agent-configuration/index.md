---
Title: Agent configuration
Date: 2017-12-20
---

## The metadata of your agent

This is the configuration of the Nodejs sample agent:

```json
{
  "id": "sampleagent-deathmatch-nodejs",
  "name": "Sample deathmatch agent for Node.js",
  "license": "MIT",
  "language": "nodejs",
  "gamemode": "deathmatch",
  "repourl": "https://github.com/ByteArena/sampleagent-deathmatch-nodejs",
  "description": "Sample Node.js agent",
  "avatarurl": "https://avatars1.githubusercontent.com/u/28099873"
}
```

Note that you need to provide at least the `id` and `name` key in the configuration of your agent.

## Changing the identifier of your agent

The identifier of your agent is stored in the `id` key.

```json
{
  "id": "sampleagent-deathmatch-nodejs",
  …
}
```

## Changing the display name of your agent

The display name of your agent is stored in the `name` key.

```json
{
  "name": "sampleagent-deathmatch-nodejs",
  …
}
```
