# Twitter feed

Hello! In order to get the application to work you need to run the following.

Add Api key and Secret Key to `.env`.

If you have composer and node installed:

```sh
composer install
npm i
npm run build
docker-compose up
```

If you only have Docker:

```sh
docker run --rm -v $(pwd):/app composer install
docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app node:slim npm install
docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app node:slim npm run build
docker-compose up
```

Go to http://localhost:8090/

# Features
- Renders images
- Replaces twitter handles with links to easily load a user's timeline
- Counts followers
- Loads profile pic
- Shows error when failure

# Decisions
- I've used Slim PHP Framework since it's a good one to keep things simple, but organised, and make it easier to focus on the code I've actually written.
- The API KEY and SECRET are dynamically loaded from `.env` . As I've pushed this to a public repo I've removed the keys I was using during development.

