// SDL typedef for rootQuery
module.exports = rootQuery = `
type Query {
    anime(name: String): animeData
    character(name: String): characterData
}`