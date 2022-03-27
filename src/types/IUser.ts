import IPlaylist from "./Iplaylist";

interface IUser {
  id: string;
  username: string;
  password: string;
  playlist: IPlaylist | Record<string, never>;
}

export default IUser;
