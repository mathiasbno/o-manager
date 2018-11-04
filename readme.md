# O-manger

This is a WIP O-manger implementation and a proof of consept.
The gole is to create a manager using data from Eventor (NO, SE and IOF).

## Setup and structure

We use the folowing libraries to run this project:

- Yarn
- Node
- MongoDB
- Mongoose
- Express

For now you can only run this localy and we need to start two processes
to get this to work. Run the server using express and then we can run
the processing script.

You need to do some initial setup on your machine and install MongoDB, to do this you can follow this tutorial: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

For Mac users I recomend using homebrew.

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

## Todos and roadmaps

Before we have a working Alpha we need to get in place the following:

- [] Simple frontend using React
- [] Calculation of runner cost
- [] Calculation of result pr race

### Roadmap

- [] Enable deployment to server (maybe Docker)
- [] Add worker to fetch info regularly
- [] Add possibility to administrate series and events
- [] Add elaborate frontend to manage teams for different series and events

## Want to contribute?

If you want to add functionality, codereview, have ideas or othervise want to contribute to this project; feel free to open a [Pull request](https://github.com/mathiasbno/numberclicker/pulls) or [add an issue](https://github.com/mathiasbno/numberclicker/issues) on Github.
