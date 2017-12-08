---
Title: Basic obstacle avoidance
Date: 2017-12-01
---

In the [Getting Started with Byte Arena](/guides/getting-started) guide, we had a look on how to scaffold a pretty basic agent that blindly strolls through the Game World.

**In this guide, we pursue the development of our agent, adding basic obstacle avoidance capabilities.**

If you've not done it already, please complete the [Getting Started guide](/guides/getting-started) before going on with this one.

## The final code

Here's what our `src/index.js` will look like when we're finished with this guide.

```js
// import SDK and vector facilities to ease development
import { vector, comm } from "bytearena-sdk";
const Vector2 = vector.Vector2;

// Connecting our agent
const agent = comm.connect();

// Watching perception stream
agent.on("perception", perception => {
  const actions = [];

  // Get a steering vector based on perception
  let steering = navigate(perception);

  // Submitting our actions for this turn
  actions.push({ method: "steer", arguments: steering.toArray() });
  agent.do(actions);
});

// Returns a steering vector exploring the world,
// or dodging an obstacle if there's any
const navigate = perception => {

  // Obtain a vector steering away from obstacles
  // if there's any on our path, or null if not
  // This func is defined below
  let steering = avoidObstables(perception);

  if(!steering) {
    // no obstacle has to be avoided
    // we can just stroll around randomly
    const direction = Math.random() < 0.5 ? -1 : 1; // -1: left, 1: right
    const x = direction * Math.random();
    const y = 3; // move forward 3 meters

    steering = new Vector2(x, y);
  }

  return steering;
};

// Returns a vector steering away from
// an obstacle if there's any in front of us
const avoidObstables = perception => {

  // this is the resulting vector (null if no vector)
  let steering = null;

  // this remembers the distance to the obstacle we're currently
  // steering away in the algorithm below
  let curdistance = null;

  // for everything that stands in our field of view
  for (const perceived of perception.vision) {

    // build a vector to the closest point of the obstacle
    const point = Vector2.fromArray(perceived.nearedge);

    // determine the angle of this point relative to us
    // angle increases clockwise, and 0 is at 12:00 on the clock
    // so 0° => straight ahead, 90° => 90° to our right, 270° => 90° to our left
    const angle = point.angle();  // in radians
    
    // The magnitude of a vector is its length
    // This is the distance between us and the obstacle
    const distance = point.mag(); // in meters

    // If obstacle is 15m away or less, and our current steering
    // is not yet avoiding any closer obstacle,
    // we steer away from this one
    if (distance < 15 && (!curdistance || curdistance > distance)) {

      if (angle < degreesToRadians(180)) {
        // obstacle is on our right, moving left
        steering = new Vector2(-10, 0);

      } else {
        // obstacle is on our left, moving right
        steering = new Vector2(10, 0);
      }

      // updating distance to obstacle currently steered away
      curdistance = distance;
    }
  }

  // Done ! returning either a vector, or null
  return steering;
}

// In Byte Arena, angles are expressed in radians
// This converts from radians to degrees
const degreesToRadians = deg => deg * (2 * Math.PI) / 360.0;
```

You can also find this code on GitHub in the `basic-obstacle-avoidance` branch of our `sample-nodejs-agent` repo here: <https://github.com/ByteArena/sample-nodejs-agent/blob/basic-obstacle-avoidance/src/index.js>

## Implementation step by step

Let's break down this code and explain what it does bit by bit:

### Main structure of the agent


```js
// import SDK and vector facilities to ease development
import { vector, comm } from "bytearena-sdk";
const Vector2 = vector.Vector2;

// Connecting our agent
const agent = comm.connect();

// Watching perception stream
agent.on("perception", perception => {
  // ...
  // Get a steering vector based on perception
  let steering = navigate(perception);
  // ...
});
```

This is the main structure of our agent code, and has been previously explained in the [Getting Started](/guides/getting-started) guide.

The only difference is that we moved the navigation code in the `navigate` function; calling it gives us a steering vector.

### Dodging an obstacle or strolling around?

```js
// Returns a steering vector exploring the world,
// or dodging an obstacle if there's any
const navigate = perception => {

  // Obtain a vector steering away from obstacles
  // if there's any on our path, or null if not
  let steering = avoidObstables(perception);

  if(!steering) {
    // no obstacle has to be avoided
    // we can just stroll around randomly
    // [...]
  }

  return steering;
};
```

We've got one move per tick, so **we've got to decide wether to dodge an obstacle or explore the map on each tick.**

In our basic implementation, we always give the priority to dodging obstacles. So if the obstacle avoidance algorithm feeds us a vector steering away from an obstacle, we use it inconditionally, otherwise it's just business as usual.

### The obstacle avoidance function

```js
// Returns a vector steering away from
// an obstacle if there's any in front of us
const avoidObstables = perception => {

  // this is the resulting vector (null if no vector)
  let steering = null;

  // this remembers the distance to the obstacle we're currently
  // steering away in the algorithm below
  let curdistance = null;

  // for everything that stands in our field of view
  for (const perceived of perception.vision) {
    // [...] Algorithm detailed below
  }

  // Done ! returning either a vector, or null
  return steering;
}
```

The job of this function is to give us a vector steering away from obstacles we might hit soon, or `null` if there isn't any.

It's basicaly a loop iterating over every obstacle we've got in our field of view, and determining the best action to take regarding this obstacle.

#### Algorithm for our basic obstacle avoidance

```js
// [...]

for (const perceived of perception.vision) {

  // build a vector to the closest point of the obstacle
  const point = Vector2.fromArray(perceived.nearedge);

  // determine the angle of this point relative to us
  // angle increases clockwise, and 0 is at 12:00 on the clock
  // so 0° => straight ahead, 90° => 90° to our right, 270° => 90° to our left
  const angle = point.angle();  // in radians

  // The magnitude of a vector is its length
  // This is the distance between us and the obstacle
  const distance = point.mag(); // in meters

  // If obstacle is 15m away or less, and our current steering
  // is not yet avoiding any closer obstacle,
  // we steer away from this one
  if (distance < 15 && (!curdistance || curdistance > distance)) {

    if (angle < degreesToRadians(180)) {
      // obstacle is on our right, moving left
      steering = new Vector2(-10, 0);

    } else {
      // obstacle is on our left, moving right
      steering = new Vector2(10, 0);
    }

    // updating distance to obstacle currently steered away
    curdistance = distance;
  }
}
```

**For every obstacle, we've got to determine:**

* wether it's at a safe distance or not
* if it's dangerousely close, what's the best steering to apply to avoid it

**To do so:**

* we get the closest point of the obstacle

* **we determine if this point is closer than 15m** (our abitrary safe distance)

    * if it's not, we ignore the obstacle and move on to the next

    * **if it is dangerousely close**:

        * we determine if this obstacle is closer than the obstacle we're currently steering away from (if any)

            * if it's not, we ignore the obstacle and move on to the next

            * **if it is closer than the previous obstacle**, we have to steer away from it:

                * **we determine wheter to turn left of right** to avoid the obstacle based on the position of the obstacle relative to us (based on the angle between us and the onstacle)

                * we forge a steering vector, and keep to return it in the end

## Rebuilding the agent and visualizing the result

Upon modification, your agent has to be rebuilt and the trainer restarted for the new code to be run.

Have a look at the [Getting Started guide for instructions on how to build your agent](/guides/getting-started/#building-the-agent).

Here's what it should look like:

{{<youtube-async N_9uFZ0RIvA>}}

## Next up

Your agent should now be capable of navigating the Game World without smashing in every obstacle on its path. Of course, the algorithm at play here is pretty basic, and there's **a lot** of room for improvement.

[In the next and last guide of this Quickstart, we'll have a look on how to make your agent aim and shoot with its gun](/guides/aiming-shooting).