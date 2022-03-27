import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/config";
import db from "../config/DB";
import { CreatePlaylistService, ListenedByMeUpdate } from "../services/playlist.services";
import { normalizeTitle } from "../services/user.services";

const createPlaylist = async (req: Request, res: Response) => {
  const token = req.headers.authorization.split(" ")[1];

  if (req.query.artist) {
    const { artist, song } = req.query;
    const playlist = ListenedByMeUpdate({ artist, song, token, res });
    return "";
  }

  const playlist = req.body;
  const user = CreatePlaylistService({ playlist, token, res });

  return " ";
};

export default createPlaylist;
