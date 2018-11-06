# O-manager

This is a WIP O-manger implementation and a proof of consept.
The gole is to create a manager using data from Eventor (NO, SE and IOF).

## Setup and structure

We use the folowing libraries to run this project:

- [Yarn](https://yarnpkg.com/lang/en/)
- [Node](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [Direnv](https://direnv.net/)

Bodus:
- [mongoui](https://github.com/azat-co/mongoui)

For now you can only run this localy and we need to start two processes
to get this to work. Run the server using express and then we can run
the processing script.

You need to do some initial setup on your machine and install MongoDB, to do this you can follow this tutorial: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

For Mac users I recomend using `homebrew`.

To get the data from Eventor you must provide a API key. This you can get by logging in to eventor and go to mange account. The API key is bound to your team/organization so you have to be an admin to access this.

Make suder you have [direnv](https://direnv.net/) installed. To load them into you app you should copy and rename the `.envrc-sample` to `.envrc`, there you can provide API keys for all the different Eventors.

---

To install the app start by running:

```
$ yarn install
```

Now we can start the server:

```
$ yarn run serve
```

And the processing:

```
$ yarn start
```

In the Processing file you'll find functions to import races, including event data, teams, nations and runners.

## Import event data

Now that you have your project up and running we can import some data. The scripts will import and save event data, all clubs, nations and runners in a given race. If a any of the abowe already excists in the database the script will skip them.

This is determined by the Eventor ID that is stored on each element. This id is not percisted across eventor instances, so if a runner has a user in both Norwegian and Swedish Eventor you'll end up with a "duplicate". Note that they are actually two seperate instancess and connected to races in their respective Eventor instances.

### First import

In theori the scripts can import any race from any Eventor, but in this example we'll import a small race from the Norwegian Eventor.

Make sure that you are running the processing task using `yarn start` in the terminal.

Open `processing/index.js` and add the folowing lines. Make sure that the env variable is set and initialized using `direnv allow`.

```
const EventorApi = require("./eventor-api/index.js");
const { processEvent } = require("./helpers/eventHelper.js");

const EventorNO = new EventorApi({
  apiKey: process.env.EVENTOR_NO_APIKEY,
  url: "https://eventor.orientering.no/api/"
});

processEvent(EventorNO, 8998, true);
```

Note that the last parameter indicates that this should run as a dryrun at first, not storing anything but logging the result in the terminal.

When you are ready to save, make sure that the server is running, open a new terminal window and run `yarn run serve`. Now you can remove the dryrun flag and it will save the data in your database.

Using `mongoui` you can now see the data in your database.

## Todos and roadmaps

Before we have a working Alpha we need to get in place the following:

- [ ] Simple frontend using React
- [x] Calculation of runner cost
- [ ] Calculation of result pr race

### Roadmap

- [ ] Enable deployment to server (maybe Docker)
- [ ] Add worker to fetch info regularly
- [ ] Add possibility to administrate series and events
- [ ] Add elaborate frontend to manage teams for different series and events
- [ ] Add working implementation for multiday events

## Want to contribute?

If you want to add functionality, codereview, have ideas or othervise want to contribute to this project; feel free to open a [Pull request](https://github.com/mathiasbno/numberclicker/pulls) or [add an issue](https://github.com/mathiasbno/numberclicker/issues) on Github.
