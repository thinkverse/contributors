const parse = require('parse-link-header')
const centra = require('@aero/centra')

require('dotenv').config()

module.exports = async (request, response) => {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${process.env.GITHUB_ID}:${process.env.GITHUB_TOKEN}`, 'utf8').toString('base64')}`,
    'User-Agent': 'thinkverse'
  }

  const intermediary = []
  let avatars = {}

  try {
    response.setHeader('Access-Control-Allow-Origin', '*')

    const { org = 'thinkverse', repo = 'contributors' } = request.query

    const initial = await centra(`https://api.github.com/repos/${org}/${repo}/contributors?per_page_100`)
      .header(headers).send()

    const body = JSON.parse(initial.body.toString())

    if (initial.headers.link) {
      const body = new Array(initial.body.toString())

      for (let index = 2; index < parse(initial.headers.link).last.page; index++) {
        const next = await centra(`https://api.github.com/repos/${org}/${repo}/contributors?per_page_100&page=${index}`)
          .header(headers).json()

        intermediary.push(next)
      }

      intermediary.flat()

      const users = { ...body, ...intermediary }

      avatars = Object.entries(users).flat(2)
        .filter(entry => entry.avatar_url)
        .map(user => user.avatar_url)

      response.setHeader('Content-Type', 'application/json')
      return response.send(avatars).status(200)
    }

    avatars = body
      .filter(entry => entry.avatar_url)
      .map(user => user.avatar_url)

    response.setHeader('Content-Type', 'application/json')
    response.send(avatars).status(200)
  } catch (error) {
    return response.status(500).send(error.toString())
  }
}
