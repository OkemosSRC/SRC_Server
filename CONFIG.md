# Socket Events

## EVENT PAYLOAD STRUCTURE

| Field | Type    | Description                | Required   |
|-------|---------|----------------------------|------------|
| op    | integer | opcode for the payload     | Yes        |
| d     | mixed   | event data                 | Yes        |
| t     | string  | event name for the payload | No         |

### EVENT `battery_data`

| OP CODE | EVENT NAME | DESCRIPTION                  | SOURCE |
|---------|------------|------------------------------|--------|
| 1       | `submit`   | Battery Info submit          | Client |
| 2       | `error`    | Battery info submit invalid  | Server |
| 3       | `success`  | Battery info submit success  | Server |
| 4       | `fail`     | Battery info submit failed   | Server |


