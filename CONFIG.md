# Socket Events

## EVENT PAYLOAD STRUCTURE

| Field | Type    | Description                | Required   |
|-------|---------|----------------------------|------------|
| op    | integer | opcode for the payload     | Yes        |
| d     | mixed   | event data                 | Yes        |
| t     | string  | event name for the payload | No         |

### EVENT `battery_data`

| OP CODE | EVENT NAME        | DESCRIPTION                 | SOURCE |
|---------|-------------------|-----------------------------|--------|
| 1       | `submit`          | Battery Info submit         | Client |
| 2       | `error`           | Battery info submit invalid | Server |
| 3       | `success`         | Battery info submit success | Server |
| 4       | `failed`          | Battery info submit failed  | Server |
| 5       | `get`             | get battery info            | Client |
| 6       | `current_battery` | Current battery info        | Server |
| 7       | `unauthorized`    | Action unauthorized         | Server |

### EVENT `speed_data`

| OP CODE | EVENT NAME      | DESCRIPTION               | SOURCE |
|---------|-----------------|---------------------------|--------|
| 1       | `submit`        | Speed Info submit         | Client |
| 2       | `error`         | Speed info submit invalid | Server |
| 3       | `success`       | Speed info submit success | Server |
| 4       | `fail`          | Speed info submit failed  | Server |
| 5       | `get`           | get speed info            | Client |
| 6       | `current_speed` | Current speed info        | Server |
| 7       | `unauthorized`  | Action unauthorized       | Server |
