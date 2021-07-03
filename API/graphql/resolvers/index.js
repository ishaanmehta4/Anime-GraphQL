const { getCharacterData, getAnimeData } = require('../../lib/scrapers');

// root query resolver for anime, field resolver for characterData.anime
var anime = async (parent, args) => {
  if (parent) {
    // console.log('searchAnime', parent.from);
    let [animeData, error] = await getAnimeData(parent.from);
    if (!error) return animeData;
    throw new Error(error);
  }

  // console.log('searchAnime', args.name);
  let [animeData, error] = await getAnimeData(args.name);
  if (!error) return animeData;
  throw new Error(error);
};

// root query resolver for character
var character = async (_, args) => {
  // console.log('searchCharacter', args.name);
  let [characterData, error] = await getCharacterData(args.name);
  if (!error) return characterData;
  throw new Error(error);
};

// field resolver for animeData.characters
var characters = async parent => {
  // console.log('searchCharacters for animeData', parent.name);
  let characterPromises = [];
  let MAX_CHARACTERS_LIMIT = process.env.MAX_CHARACTERS_LIMIT || 10;
  parent.characterNames.slice(0, MAX_CHARACTERS_LIMIT).forEach(async name => {
    characterPromises.push(getCharacterData(name));
  });

  let characterResponses = await Promise.all(characterPromises);
  characterResponses = characterResponses.map(resp => resp[0]); // getting all results
  parent.characterNames.slice(MAX_CHARACTERS_LIMIT).forEach(name => {
    characterResponses.push({ name });
  });
  return characterResponses;
};

module.exports = resolvers = {
  Query: { character, anime },
  characterData: {
    anime,
  },
  animeData: {
    characters,
  },
};
