---
Title: Installing / Upgrading Byte Arena
Date: 2017-12-01
---
Byte Arena is both an [Online Platform](/guides/online-platform), and a CLI tool you can use to code and train your agents on your own machine.

Follow these instructions on how to install or upgrade the Byte Arena CLI tool on your machine.

## Install or upgrade with a script

To install or upgrade ByteArena, execute the following command in your terminal:

```sh
curl -s https://get.bytearena.com/sh | bash -
```

We assume that you have `curl` and `bash` installed on your machine.

Upon install, a `.bytearena` folder is created in your `$HOME` dir, where the trainer map (500KB) will be downloaded and stored.

## Install or upgrade manually

You can install the binary [available as a release on GitHub.](https://github.com/ByteArena/cli/releases)

Once downloaded, simply put the binary in your `$PATH` under the name `ba`.

You'll then need to fetch the trainer map from our online server by executing the command:

```sh
ba map update
```

This operation creates a `.bytearena` folder in your `$HOME` dir, where the trainer map (500KB) will be downloaded and stored.

## Is it already installed? What version do I have?

To check if you have already installed it, simply issue the command `ba --version` on the command line. If `ba` is installed, you should see someting like this

```sh
$ ba --version
Byte Arena cli tool version v0.0.6
```
