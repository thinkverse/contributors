# Contributions 🎩
###### Get an image of your lovely contributors

Get an image of your amazing contributors that is perfect for your README. 😀

## Information 🤓

For now it returns the first 30 results, excluding bots, that will be fixed in later versions.

### Example 🤘

Here's an example using one of my favorite projects [VueJS].

[![Our amazing contributors](https://contributors.thinkverse.vercel.app/api/contributors?org=vuejs&repo=vue)](https://github.com/thinkverse/contributors)

## Usage 🎉

Paste this markdown in your README.

`[![Our amazing contributors](https://contributors.thinkverse.vercel.app/api/contributors?org={organization}&repo={repository})](https://github.com/thinkverse/contributors)`

Change `{organization}` and `{repository}` with your information.

## Contribute 😎

```bash
git clone https://github.com/thinkverse/contributors contributors-dev
cd contributors-dev && yarn install
cp .env.example .env
```

**Note** You will need some way to run serverless functions locally, this project uses [vercel].

```bash
yarn global add vercel
```

Now you will become one of our contributors. 👍

[![My amazing contributors](https://contributors.thinkverse.vercel.app/api/contributors)](https://github.com/thinkverse/contributors)

[vuejs]: https://vuejs.org/
[vercel]: https://vercel.com/download