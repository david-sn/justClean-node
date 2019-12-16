# JustClean nodejs - setup


## Installation

1- Use node version **v8.10.0** and npm version **3.5.2**.

2- Use mysql version  **14.14 Distrib 5.7.28**.

```bash
node -v
npm -v
mysqlid --version
```

## Configure
1- Clone the project .

2- Create database on mysql server called **'jc'**, Or change this in config/connectionDB.js.

3- enable user **root** identified by **root** to enable nodejs connect to DB.

4- Goto base directory for the cloned project and build it by using command
``` npm i ```.

5- make sure that port **3000** is free on the machine.

6- start server by command ```npm start```.

7- **JustClean server Started on port --- 3000** will printed upon started.

8- import postman collection from [here](https://www.getpostman.com/collections/cfde47755b38ec24fac4) or find the file in project.

9- **from postman under user folder you must create user(email, password) to use authenticated APIs**.

10- run command ```./node_modules/.bin/sequelize-cli db:migrate``` to import database schema migration.

11- run command ```./node_modules/.bin/sequelize-cli  db:seed:all``` to insert test data into schema.

12- Enjoy.

## Scenarios
1- on startup database schema will create automatically and will insert the following

in Tower table 2 records [ {id:1, name:tower1}, {id:2, name:tower2} ],

in Office table 6 records [{id:1, name: 'office1',towerId:1 }, {id:2, name: 'office2',towerId:1 }, {id:3, name: 'office3',towerId:1 }, {id:4, name: 'office4',towerId:2 }, {id:5, name: 'office5',towerId:2 }, {id:6, name: 'office6',towerId:2 } ].

2- also ues any scoketIO client to get real time changes, prefere to use [this tool](https://chrome.google.com/webstore/detail/socketio-tester/cgmimdpepcncnjgclhnhghdooepibakm?hl=en)
{host:'localhost:3000', eventName:'**justCleanEvents**' }.

3- Authenticated APIs by add header {"Authorization":"Bearer {{TOKEN}}" }

4- Enjoy to use other APIs from postman for tower and office and see real time affected by changes.

_NOTE: **use ESLint by command ``` ./node_modules/.bin/eslint . ```  , and the result is variable defined but not used like parameter in callback**

###########################################