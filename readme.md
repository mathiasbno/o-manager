# O-manager

This is a WIP O-manger implementation and a proof of concept.
The goal is to create a manager using data from Eventor (NO, SE and IOF).

## Setup and structure

We use the following libraries to run this project:

- [Yarn](https://yarnpkg.com/lang/en/)
- [Node](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [Direnv](https://direnv.net/)

Bonus:
- [mongoui](https://github.com/azat-co/mongoui)

For now you can only run this locally and we need to start two processes
to get this to work. Run the server using express and then we can run
the processing script.

You need to do some initial setup on your machine and install MongoDB, to do this you can follow this tutorial: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

For Mac users I recommend using `homebrew`.

To get the data from Eventor you must provide a API key. This you can get by logging in to Eventor and go to mange account. The API key is bound to your team/organization so you have to be an admin to access this.

Make sure you have [direnv](https://direnv.net/) installed. To load them into you app you should copy and rename the `.envrc-sample` to `.envrc`, there you can provide API keys for all the different Eventors.

---

To install the app start by running:

```
$ yarn install && cd client && yarn install
```

Now we can start the server:

```
$ yarn run dev
```

For testing imports and calculations you can run the processing seperate with:

```
$ yarn run process
```

In the Processing file you'll find functions to import races, including event data, teams, nations and runners.

## Import event data

Now that you have your project up and running we can import some data. The scripts will import and save event data, all clubs, nations and runners in a given race. If a any of the above already exists in the database the script will skip them.

This is determined by the Eventor ID that is stored on each element. This id is not persisted across Eventor instances, so if a runner has a user in both Norwegian and Swedish Eventor you'll end up with a "duplicate". Note that they are actually two separate instances and connected to races in their respective Eventor instances.

### First import

```

–––– THIS WILL BE CHANGED –––

```

In theory the scripts can import any race from any Eventor, but in this example we'll import a small race from the Norwegian Eventor.

Make sure that you are running the processing task using `yarn start` in the terminal.

Open `processing/index.js` and add the following lines. Make sure that the env variable is set and initialized using `direnv allow`.

```
const EventorApi = require("./eventor-api/index.js");
const { processAndSaveEvent} = require("./actions/save.js");

const EventorNO = new EventorApi({
  apiKey: process.env.EVENTOR_NO_APIKEY,
  url: "https://eventor.orientering.no/api/"
});

processAndSaveEvent(EventorNO, 8998, true);
```

Note that the last parameter indicates that this should run as a dryrun at first, not storing anything but logging the result in the terminal.

When you are ready to save, make sure that the server is running, open a new terminal window and run `yarn run serve`. Now you can remove the dryrun flag and it will save the data in your database.

Using `mongoui` you can now see the data in your database.

Now that we have the runners we need to calculate a price for an upcomming event. We'll import this as well using the same import statement we did abowe.

```
processAndSaveEvent(EventorNO, 1234, true);
```

This event is probably long in the feature, but now we at least have an event object that we can connect and calculate prices on.

First we need to run:

```
setPriceForRunners(1234, 8998)
```

This will calculate the prices for the event `1234` based on the runners performance at `8998`. You can make indivudual price tables, just pass the name of the table as a third argument, or just use the pre excisting one. This will check the event type of the event that we are calculating prices for.

## Todos and roadmaps

Before we have a working Alpha we need to get in place the following:

- [ ] Simple frontend using React
- [x] Calculation of runner cost
- [x] Calculation of result pr race

### Roadmap

- [ ] Enable deployment to server [See article](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
- [ ] Add worker to fetch info regularly
- [ ] Add possibility to administrate series and events
- [ ] Add elaborate frontend to manage teams for different series and events
- [ ] Add working implementation for multiday events

## Want to contribute?

If you want to add functionality, code review, have ideas or otherwise want to contribute to this project; feel free to open a [Pull request](https://github.com/mathiasbno/numberclicker/pulls) or [add an issue](https://github.com/mathiasbno/numberclicker/issues) on Github.
