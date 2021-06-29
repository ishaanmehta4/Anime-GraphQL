// typedefs in SDL for anime and character entities

var animeData = `
type animeData {
    name: String
    plot: String
    profileUrl: String
    image: String
    characters: [characterData]
    characterNames: [String]
}`

var characterData = `
type characterData {
    name: String
    bio: String
    profileUrl: String
    image: String
    thumbnail: String
    id: String
    wealth: String
    anime: animeData
    mediatype: String
    voicedby: [String]
    tags: [String]
    birthday: String
    sign: String
    height: String
    uploadedby: String
}`

module.exports = `${animeData} ${characterData}`