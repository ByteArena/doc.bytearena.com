---
Title:  Understanding the perception
Date: 2017-12-01
Draft: true
Tags: ["todoc"]
---

# Perception representation

The following specification is only for the `clear_beta` protocol version. Make sure you are using it before continuing to read.

**This specification is subject to changes.**

## Types in JSON

- `Vector2`: an array of the shape `[x, y]` where `x` and `y` are of type `float64`.
- `Angle`: a `float64` representing a radian.
- `ItemTag`: the possible values are `agent`, `obstacle` and `projectile`.

All the points are expressed using a vector relative to the agent.

### World

![world](/assets/img/perception-world.svg)

### Item in the vision

#### Obstacles

Obstacle are static items, I omited the vector because it is equal to null.

![perception](/assets/img/perception-object-cross.svg)

In this example, you can see two faces of the object. They share the same vector to the `nearedge`. The other points are not given since they are not visible from the agent point of view.

#### Projectiles and agents

Projectiles and agents (unlike obstacles) are perceived as circles with a velocity (the blue arrow).

![perception2](/assets/img/perception-agent.svg)
