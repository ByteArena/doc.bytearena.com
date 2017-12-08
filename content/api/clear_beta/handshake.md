---
Title: "Handshake (clear_beta release)"
Date: 2017-12-01
---

## Handshake structure

After the handshake some data will be send back to the agent, with the following properties:

### `Specs`

Property name      | Type        | Representation in the JSON
:------------------|:------------|:--------------------------
maxspeed           | `float64`   | `Number`
maxsteeringforce   | `float64`   | `Number`
maxangularvelocity | `float64`   | `Number`
visionradius       | `float64`   | `Number`
visionangle        | `Angle`     | `Number (radian)`
bodyradius         | `float64`   | `Number`
maxshootenergy     | `float64`   | `Number`
shootrecoveryrate  | `float64`   | `Number`
Gear               | `GearSpecs` | `Object`


### `GearSpecs`

Property name | Type      | Representation in the JSON
:-------------|:----------|:--------------------------
Genre         | `string`  | `string`
Kind          | `string`  | `string`
Specs         | `unknown` | `Object`


### `GunSpecs`

Property name    | Type      | Representation in the JSON
:----------------|:----------|:--------------------------
shootcost        | `float64` | `Number`
shootcooldown    | `int`     | `Number`
projectilespeed  | `float64` | `Number`
projectiledamage | `float64` | `Number`
projectilerange  | `float64` | `Number`

