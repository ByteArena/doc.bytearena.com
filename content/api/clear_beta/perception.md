---
Title:  Perception specification
Date: 2017-12-01
---

## Perception structure

The root object is called `perception`, it's the object you receive in argument in the `onTick` function.

### `Perception`

Property name | Type                      | Representation in the JSON
--------------|:--------------------------|:--------------------------
score         | `int`                     | `Number`
energy        | `float64`                 | `Number`
velocity      | `Vector2`                 | `Array of float64 (x, y)`
azimuth       | `float64`                 | `Number`
vision        | `array of VisionItem`     | `Array of Object`
shootenergy   | `float64`                 | `Number`
shootcooldown | `int`                     | `Number`
messages      | `array of MessageWrapper` | `Array of Object`

### `VisionItem`

Property name | Type      | Representation in the JSON
--------------|:----------|:--------------------------
tag           | `string`  | `String`
nearedge      | `Vector2` | `Array of float64 (x, y)`
center        | `Vector2` | `Array of float64 (x, y)`
faredge       | `Vector2` | `Array of float64 (x, y)`
velocity      | `Vector2` | `Array of float64 (x, y)`

### `MessageWrapper`

Property name | Type      | Representation in the JSON
--------------|:----------|:--------------------------
subject       | `string`  | `String`
body          | `unknown` | `Object`

### `Score`

Property name | Type     | Representation in the JSON
--------------|:---------|:--------------------------
value         | `int`    | `Number`

### `Stats`

Property name      | Type      | Representation in the JSON
-------------------|:----------|:--------------------------
distanceTravelled  | `float64` | `Number`

### `YouAreRespawning`

Property name | Type  | Representation in the JSON
--------------|:------|:--------------------------
respawningin  | `int` | `Number`

### `YouHaveBeenFragged`

Property name | Type     | Representation in the JSON
--------------|:---------|:---------------------------------
by            | `string` | `String`

### `YouHaveBeenHit`

Property name | Type      | Representation in the JSON
--------------|:----------|:--------------------------
kind          | `string`  | `String`
comingfrom    | `float64` | `Number`
damage        | `float64` | `Number`

### `YouHaveFragged`

Property name | Type     | Representation in the JSON
--------------|:---------|:--------------------------
who           | `string` | `String`

### `YouHaveHit`

Property name | Type     | Representation in the JSON
--------------|:---------|:--------------------------
Who           | `string` | `String`

### `YouHaveRespawned`
