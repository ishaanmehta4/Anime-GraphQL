import { getAnimeData, getCharacterData } from '../../lib/scrapers';
import { Resolver } from '@apollo/client/core';

// root query resolver for anime, field resolver for characterData.anime
var anime: Resolver = async (parent, args) => {
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
var character: Resolver = async (_, args) => {
  // console.log('searchCharacter', args.name);
  let [characterData, error] = await getCharacterData(args.name);
  if (!error) return characterData;
  throw new Error(error);
};

// field resolver for animeData.characters
var characters: Resolver = async parent => {
  // console.log('searchCharacters for animeData', parent.name);
  let characterPromises: Array<Promise<any>> = [];
  let MAX_CHARACTERS_LIMIT = process.env.MAX_CHARACTERS_LIMIT || 10;
  parent.characterNames.slice(0, MAX_CHARACTERS_LIMIT).forEach(async (name: string) => {
    characterPromises.push(getCharacterData(name));
  });

  let characterResponses = await Promise.all(characterPromises);
  characterResponses = characterResponses.map(resp => resp[0]); // getting all results
  parent.characterNames.slice(MAX_CHARACTERS_LIMIT).forEach((name: string) => {
    characterResponses.push({ name });
  });
  return characterResponses;
};

let resolvers = {
  Query: { character, anime },
  characterData: {
    anime,
  },
  animeData: {
    characters,
  },
};
export default resolvers;
