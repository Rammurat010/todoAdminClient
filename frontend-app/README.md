**Table:** todos

| **Columns:** | **id**                      | int AI PK |
| ------------ | --------------------------- | --------- |
| title        | varchar(255)                |
| due_date     | date                        |
| category     | varchar(100)                |
| priority     | enum('Low','Medium','High') |
| status       | enum('Pending','Completed') |

**Table:** users

| **Columns:** | **id**                 | int AI PK |
| ------------ | ---------------------- | --------- |
| name         | varchar(100)           |
| **email**    | varchar(100)           |
| phone        | varchar(20)            |
| password     | varchar(100)           |
| role         | enum('Client','Admin') |
