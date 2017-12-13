---
Title: Aiming and shooting
Date: 2017-12-01
---

In the [Basic Obstacle Avoidance](/guides/basic-obstacle-avoidance) guide, we implemented basic navigational capabilities in our agent.

**In this guide, we pursue the development of our agent, giving him aiming and shooting abilities.**

If you've not done it already, please complete the [Basic Obstacle Avoidance guide](/guides/basic-obstacle-avoidance) before going on with this one.

## Basic implementation

Here's what we'll add to our `src/index.js`:

```js
// ...

agent.on("perception", perception => {
  // ...
  const shooting = shoot(perception);
  if(shooting) actions.push({ method: "shoot", arguments: shooting.toArray() });
  // ...
});

// ...

// shoot() returns either null or a vector
// targeting the closest agent in sight
const shoot = perception => {

    let shooting = null;

    // for everything that stands in our field of view
    for (const perceived of perception.vision) {
        if(perceived.tag != "agent") continue;

        const otherAgentPosition = Vector2.fromArray(perceived.center);

        if(!shooting || otherAgentPosition.mag() < shooting.mag()) {
            shooting = otherAgentPosition;
        }
    }

    return shooting;
};
```

You can find the full code on GitHub in the `aiming-shooting` branch of our `sample-nodejs-agent` repo here: <https://github.com/ByteArena/sample-nodejs-agent/blob/aiming-shooting/src/index.js>

As you can see, shooting is pretty straightforward:

* find a target in our field of view, if any
* aim at that target by means of a vector

## Visualizing the result

As usual, we rebuild the agent and restart our trainer (replace `powerful-jennet` with the name of your agent).

```bash
$ cd path/to/powerful-jennet
$ ba build
```

This time we need another agent to shoot at. We will spawn our agent four times. To do so, we can simply add `--agent` three more times in the `ba train command`:

```bash
$ ba train -agent powerful-jennet -agent powerful-jennet -agent powerful-jennet -agent powerful-jennet
```

Here is what it should look like in your browser at <http://localhost:8080/arena/1>.

{{<youtube-async Oeunh0hOkbM>}}

## A less basic aiming method

As you can see in the video above, we miss the target quite often.

This is due to the fact that the targets are constantly moving at high velocities, and when our projectile reaches the targeted point, the targeted  agent already moved quite a lot.

To increase our chances of hitting the target, we must take into account these elements:

* the propagation speed of the projectiles, although high, is not infinite, so they don't reach their targets instantaneously
* the targeted agents have a velocity of their own, and in fact we perceive that velocity just like we perceive their position
