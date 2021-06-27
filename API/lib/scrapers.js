const axios = require('axios')
const jsdom = require("jsdom");

async function getCharacterData(characterName) {
    let characterData = {}
    let searchUrl = 'https://www.animecharactersdatabase.com/searchall.php?searchin=c&sq=' + characterName.toLowerCase().replace(' ','+')
    console.log(`fetching search results for ${characterName}...`)
    let searchRes = await axios.get(searchUrl)
    let dom = (new jsdom.JSDOM(searchRes.data))
    dom = dom.window.document;
    if(!dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a')) {
        console.log('No results for ' + characterName)
        return {error: 'not found'}
    }
    let profileUrl = 'https://www.animecharactersdatabase.com/' + dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a').href;
    console.log('fetching profile...')
    let profileRes = await axios.get(profileUrl)
    dom = (new jsdom.JSDOM(profileRes.data))
    dom = dom.window.document;
    // console.log('Info: ', dom.querySelector('#characterzone > table > tbody > tr > td:nth-child(2) > p').textContent)

    characterData.bio = dom.querySelector('#characterzone > table > tbody > tr > td:nth-child(2) > p').textContent.replace(/\r?\n|\r/g, " ").trim()
    characterData.profileUrl = profileUrl
    characterData.image = 'https://ami.animecharactersdatabase.com/uploads/chars/' + dom.querySelector('#sidephoto > img').src.split('/').pop().replace('.jpg', '.png')
    characterData.thumbnail = dom.querySelector('#sidephoto > img').src

    dom.querySelectorAll('#sidephoto > table:nth-child(4) > tbody > tr').forEach(row => {
        let tempDom = new jsdom.JSDOM(row.innerHTML.replace('th>', 'p>').replace('td>', 'p>'))
        tempDom = tempDom.window.document
        // console.log(tempDom.querySelectorAll('p')[1].textContent)
        let paragraphElements = tempDom.querySelectorAll('p')
        if(paragraphElements.length == 2 && paragraphElements[0].textContent.replace(/\s/g,'').length <= 15) {
            characterData[paragraphElements[0].textContent.replace(/\s/g,'').toLowerCase()] =paragraphElements[1].textContent.trim()
            // replace(/\r?\n|\t|\r/g, "")
        }
    })

    characterData.voicedby = characterData.voicedby.split(',').filter(name=> name.trim() !='')
    characterData.tags = characterData.tags.split(',').map(tag=>tag.trim())

    console.log(characterData)
    return characterData
}

async function getAnimeData(animeName) {
    let animeData = {}
    let searchUrl = 'https://www.animecharactersdatabase.com/searchall.php?in=titles&sq=' + animeName.toLowerCase().replace(' ','+')
    console.log(`fetching search results for ${animeName}...`)
    let searchRes = await axios.get(searchUrl)
    let dom = (new jsdom.JSDOM(searchRes.data))
    dom = dom.window.document;
    if(!dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a')) {
        console.log('No results for ' + animeName)
        return {error: 'not found'}
    }
    let profileUrl = 'https://www.animecharactersdatabase.com/' + dom.querySelector('#tile1 > ul > li:nth-child(2) > div.tile3top > a').href;
    console.log('fetching profile...')
    let profileRes = await axios.get(profileUrl)
    dom = (new jsdom.JSDOM(profileRes.data))
    dom = dom.window.document;

    animeData.plot = dom.querySelector('#mainframe2 > #besttable > table > tbody > tr > td').textContent.replace(/\r?\n|\r/g, " ").trim()
    animeData.profileUrl = profileUrl
    animeData.image = dom.querySelector('#bt > tbody > tr:nth-child(1) > th > a > img').src
    animeData.characters = []
    dom.querySelectorAll('#tile1 > ul > li').forEach(card=> {
        // let tempDom = new jsdom.JSDOM(card.innerHTML.replace('a>', 'p>'))
        let tempDom = new jsdom.JSDOM(card.innerHTML)
        tempDom = tempDom.window.document
        // console.log(tempDom.querySelector('a').textContent)
        if(tempDom.querySelector('a'))
        animeData.characters.push({
            characterName: tempDom.querySelector('a').textContent.trim(),
            profileUrl: 'https://www.animecharactersdatabase.com/' + tempDom.querySelector('a').href
        })
    })

    console.log(animeData)
    return animeData
}

getAnimeData('My hero academia')
// getCharacterData('Ochako')
