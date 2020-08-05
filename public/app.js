const container = document.querySelector('#contributors')
const paramaters = new URLSearchParams(window.location.search)

function renderAvatarImage (source) {
  const imageTag = document.createElement('img')
  imageTag.src = source

  container.appendChild(imageTag)
}

async function getContributors () {
  const response = await fetch(`api/avatars/?${paramaters.toString()}`)

  return await response.json()
}

getContributors().then(avatar => {
  avatar.forEach(avatar => renderAvatarImage(avatar))

  container.classList.add('rendered')
})
