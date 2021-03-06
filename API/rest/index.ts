import express, { Request, Response, Router } from 'express';

const { getCharacterData, getAnimeData } = require('../lib/scrapers');
var restRouter: Router = express.Router();

restRouter.get('/character/:character_name', async (req: Request, res: Response) => {
  try {
    let characterName = decodeURI(req.params.character_name).replace(' ', '+');
    let [data, error] = await getCharacterData(characterName);
    if (error) return res.status(404).json({ status: 'error', error });
    res.json({ status: 'success', data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
});

restRouter.get('/anime/:anime_name', async (req: Request, res: Response) => {
  try {
    let animeName = decodeURI(req.params.anime_name).replace(' ', '+');
    let [data, error] = await getAnimeData(animeName);
    if (error) return res.status(404).json({ status: 'error', error });
    res.json({ status: 'success', data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
});

module.exports = restRouter;
