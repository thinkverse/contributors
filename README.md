# Contributions 🎩
###### Get an image of your lovely contributors 

 [![Visits Badge](https://badges.pufler.dev/visits/thinkverse/contributors)](https://badges.pufler.dev) ![GitHub last commit](https://img.shields.io/github/last-commit/thinkverse/contributors) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![GitHub license](https://img.shields.io/github/license/thinkverse/contributors)](https://github.com/thinkverse/contributors/blob/master/LICENSE.md)

Get an image of your amazing contributors that is perfect for your README. 😀

## Information 🤓

For now the public API only returns the first 30 results, including bots.

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

#### Update enviroment variables

Generate your personal token under your GitHub [settings/tokens] and switch the `GITHUB_TOKEN` with that and add your organization/username to `GITHUB_ID`

**Note** You will need some way to run serverless functions locally, this project uses [vercel].

```bash
yarn global add vercel
```

Now you will become one of our contributors. 👍

[![My amazing contributors](https://contributors.thinkverse.vercel.app/api/contributors)](https://github.com/thinkverse/contributors)

### Generate full list of avatars 🔥

⚠️ Un comment the code inside [api/avatars.js](https://github.com/thinkverse/contributors/blob/HEAD/api/avatars.js)

⚠️ Use at your own risk since it can time out your api.

[vuejs]: https://vuejs.org/
[vercel]: https://vercel.com/download
[settings/tokens]: https://github.com/settings/tokens
