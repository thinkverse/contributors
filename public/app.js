const container = document.querySelector('#contributors'),
    paramaters = new URLSearchParams(window.location.search);

const repository = paramaters.get('repo') ?? 'git-badges',
    organization = paramaters.get('org') ?? 'thinkverse';

const headers = { 'User-Agent': organization }

function renderAvatarImage(source) {
    let imageTag = document.createElement('img');
    imageTag.src = source;

    container.appendChild(imageTag);
}

async function getContributors(org, repo) {
    const response = await fetch(`https://api.github.com/repos/${org}/${repo}/contributors?anon=1`, headers);

    return await response.json()
}

getContributors(organization, repository).then(contributors => {
    contributors.filter(contributor =>
        ('login' in contributor && 'avatar_url' in contributor)
        && !contributor.login.includes('[bot]'))
        .map(contributor => contributor.avatar_url)
        .forEach(avatar => renderAvatarImage(avatar));

    container.classList.add('rendered');
});