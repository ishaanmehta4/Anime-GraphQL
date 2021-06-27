const axios = require('axios')
const jsdom = require("jsdom");

exports.getCharacterData = getCharacterData = async function (characterName) {
    if(!characterName) return [null, 'Character name is required']
    let characterData = {}

    let searchUrl = 'https://www.animecharactersdatabase.com/searchall.php?searchin=c&sq=' + characterName.toLowerCase().replace(' ', '+')
    let searchRes = await axios.get(searchUrl)
    let dom = (new jsdom.JSDOM(searchRes.data))
    dom = dom.window.document;

    if (!dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a')) {
        return [null, `No results for ${characterName}`]
    }

    let profileUrl = 'https://www.animecharactersdatabase.com/' + dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a').href;
    let profileRes = await axios.get(profileUrl)
    dom = (new jsdom.JSDOM(profileRes.data))
    dom = dom.window.document;

    characterData.name = dom.querySelector('#main1 > h1 > a.fgw').textContent.replace(/\r?\n|\r/g, " ").trim()
    characterData.bio = dom.querySelector('#characterzone > table > tbody > tr > td:nth-child(2) > p').textContent.replace(/\r?\n|\r/g, " ").trim()
    characterData.profileUrl = profileUrl
    characterData.image = 'https://ami.animecharactersdatabase.com/uploads/chars/' + dom.querySelector('#sidephoto > img').src.split('/').pop().replace('.jpg', '.png')
    characterData.thumbnail = dom.querySelector('#sidephoto > img').src

    dom.querySelectorAll('#sidephoto > table:nth-child(4) > tbody > tr').forEach(row => {
        let tempDom = new jsdom.JSDOM(row.innerHTML.replace('th>', 'p>').replace('td>', 'p>'))
        tempDom = tempDom.window.document
        let paragraphElements = tempDom.querySelectorAll('p')
        if (paragraphElements.length == 2 && paragraphElements[0].textContent.replace(/\s/g, '').length <= 15) {
            characterData[paragraphElements[0].textContent.replace(/\s/g, '').toLowerCase()] = paragraphElements[1].textContent.trim()
        }
    })

    characterData.voicedby = characterData.voicedby.split(',').filter(name => name.trim() != '')
    characterData.tags = characterData.tags.split(',').map(tag => tag.trim())

    return [characterData, null]
}

exports.getAnimeData = getAnimeData = async function (animeName) {
    if(!animeName) return [null, 'Anime name is required']
    let animeData = {}

    let searchUrl = 'https://www.animecharactersdatabase.com/searchall.php?in=titles&sq=' + animeName.toLowerCase().replace(' ', '+')
    let searchRes = await axios.get(searchUrl)
    let dom = (new jsdom.JSDOM(searchRes.data))
    dom = dom.window.document;

    if (!dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a')) {
        return [null, `No results for ${animeName}`]
    }
    let profileUrl = 'https://www.animecharactersdatabase.com/' + dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a').href;
    let profileRes = await axios.get(profileUrl)
    dom = (new jsdom.JSDOM(profileRes.data))
    dom = dom.window.document;

    animeData.name = dom.querySelector('#main1 > h1').textContent.replace(/\r?\n|\r/g, " ").trim().split(' | ')[0]
    animeData.plot = dom.querySelector('#mainframe2 > #besttable > table > tbody > tr > td').textContent.replace(/\r?\n|\r/g, " ").trim()
    animeData.profileUrl = profileUrl
    animeData.image = dom.querySelector('#bt > tbody > tr:nth-child(1) > th > a > img').src
    animeData.characterNames = []

    dom.querySelectorAll('#tile1 > ul > li').forEach(card => {
        let tempDom = new jsdom.JSDOM(card.innerHTML)
        tempDom = tempDom.window.document

        if (tempDom.querySelector('a'))
            animeData.characterNames.push(tempDom.querySelector('a').textContent.trim())
    })

    return [animeData, null]
}
