interface IPlaylist {
  [key: string]: [
    {
      title: string;
      durations: string;
      releasedDate: Date;
      listenedByMe?: number;
      genres: string;
    }
  ];
}
export default IPlaylist;
