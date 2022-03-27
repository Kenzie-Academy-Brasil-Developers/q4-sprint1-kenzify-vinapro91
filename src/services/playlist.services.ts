import { Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/config";
import db from "../config/DB";
import { normalizeTitle } from "./user.services";

interface IListenedDTO {
  artist: string;
  song: string;
  token: string;
  res: Response;
}

const ListenedByMeUpdate = async ({
  artist,
  song,
  token,
  res,
}: IListenedDTO) => {
  const decoded = await jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid Token." });
    }
    return decoded;
  });
  const user = db.find((user) => decoded.username === user.username);
  const playlist = user.playlist[artist];
  if (!playlist) {
    return res.status(404).json({ message: "Invalid playlist" });
  }
  const filteredSong = playlist.filter(
    (item) => item.title === normalizeTitle(song)
  );
  if (!filteredSong[0].listenedByMe) {
    filteredSong[0].listenedByMe = 0;
  }
  filteredSong[0].listenedByMe += 1;
  return res.status(200).json(playlist);
};
const CreatePlaylistService = ({ playlist, token, res }) => {
  const username: string | void = jwt.verify(
    token,
    config.secret,
    (err, decoded): string => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid Token." });
        return " ";
      }
      if (decoded.username) {
        const { username } = decoded;
        return username;
      }
      return " ";
    }
  );
  const user = db.find((user) => username === user.username);
  if (!user) {
    return res.status(404).json({ message: "Invalid Token" });
  }

  playlist[Object.keys(playlist)[0]][0].listenedByMe = 0;

  playlist[Object.keys(playlist)[0]][0].title = normalizeTitle(
    playlist[Object.keys(playlist)[0]][0].title
  );
  user.playlist = { ...playlist, ...user.playlist };

  return res.status(200).json(user);
};

export { ListenedByMeUpdate, CreatePlaylistService };
