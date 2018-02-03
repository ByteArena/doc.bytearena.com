---
Title: Agent training
Date: 2017-12-01
---

## Run your agent

You can start your agent and the game server by running the following command:

```bash
$ ba train -agent powerful-jennet
```

Here is an example of the ouput:

<script type="text/javascript" data-rows="40" src="https://asciinema.org/a/JwmtBpH9wP9xNqSegw9UC6dhm.js" id="asciicast-JwmtBpH9wP9xNqSegw9UC6dhm" async defer></script>

A browser should open at <http://localhost:8080/arena/1>, displaying the Byte Arena visualization, where you will see your agent.

<strong>Note:</strong> you can disable that behavior by passing the `--no-browser` argument at the end of the command.

### Increase the game loop frequency

By default the ticks per seconds configuration is set to `20`. If you need to increase the frequency of the game loop you can pass the `--tps x` argument, where `x` is the desired value.

Over 60 tps the visualization might not be as fluid anymore. The alternative is to use a file recorder, see the [use the file recorder](#use-the-file-recorder) section.

### Use the file recorder

Currently in development.

## Automatically rebuild and restart

You can run the following command to start the watcher:

```sh
ba train --watch path/to/your/agent
```

That will automatically rebuild and restart your agent when a change is detected.
