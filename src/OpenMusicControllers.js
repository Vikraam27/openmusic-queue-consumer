const { Pool } = require('pg');

class OpenMusicControllers {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(userId, playlistId) {
    const query = {
      text: `SELECT musics.* FROM musics 
      LEFT JOIN playlists_songs ON playlists_songs.song_id = musics.id
      LEFT JOIN playlists ON playlists.id = playlists_songs.playlists_id
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists_songs.playlists_id
      WHERE playlists.owner = $1 OR collaborations.user_id = $1 AND playlists.id = $2`,
      values: [userId, playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = OpenMusicControllers;
