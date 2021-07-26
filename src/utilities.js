import apikey from "./key";

const shazamBaseUrl = "https://shazam.p.rapidapi.com/";
const billboardBaseUrl = "https://billboard-api2.p.rapidapi.com/";

const constOptions1 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apikey,
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

const constOptions2 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apikey,
    "x-rapidapi-host": "billboard-api2.p.rapidapi.com",
  },
};

const formatSingleMusic = data => {
  const lyric = data.sections.filter(section => section.type === "LYRICS")[0];
  const youTube = data.sections.filter(section => section.type === "VIDEO")[0];

  return {
    key: data.key,
    title: data.title,
    artist: data.subtitle,
    coverImg: data.images.coverarthq,
    backgroundImg: data.images.background,
    shazam: data.url,
    // artistID: data.artists[0].id,
    genre: data.genres ? data.genres.primary : "unknown",
    album: data.sections[0].metadata[0].text,
    label: data.sections[0].metadata[1].text,
    released: data.sections[0].metadata[2].text,
    lyrics: lyric ? lyric.text.join("\n") : "not found",
    footer: lyric ? lyric.footer : "...",
    youtubeCaption: youTube.youtubeurl.caption || "...",
    youtubeURL: youTube.youtubeurl.actions[0].uri || null,
  };
};

const formatDataShazam = data => {
  const newTracks = data.map(track => {
    return {
      key: track.key,
      title: track.title,
      subtitle: track.subtitle,
      image: track.images.coverart,
      artistId: track.artists,
    };
  });
  return newTracks;
};

const formatBillboardArtist = data => {
  let formatted = [];
  for (let item in data) {
    formatted.push({
      artist: data[item].artist,
      key: data[item].rank,
    });
  }
  return formatted;
};

const formatBillboardAlbum = data => {
  let formatted = [];
  for (let item in data) {
    formatted.push({
      album: data[item].album,
      artist: data[item].artist,
      key: data[item].rank,
    });
  }
  return formatted;
};

const formatSearchResult = result => {
  let formattedSongs = [];
  let formattedArtist = [];

  result.tracks.hits.forEach(item => {
    formattedSongs.push({
      key: item.track.key,
      title: item.track.title,
      subtitle: item.track.subtitle,
      image: item.track.images.coverart,
      //  artistId: item.track.artists[0].id !== undefined ? item.track.artists[0].id: '0'
    });
  });

  result.artists.hits.forEach(item => {
    formattedArtist.push({
      avatar: item.artist.avatar,
      name: item.artist.name,
      id: item.artist.id,
    });
  });

  return {
    songResult: formattedSongs,
    artistResult: formattedArtist,
  };
};

const getImages = (hits, query) => {
  let selected = hits.find(
    item =>
      item.result.primary_artist.name.toLowerCase() === query.toLowerCase()
  );
  return selected;
};

const shortenText = text => {
  if (text.length > 30) {
    return text.slice(0, 19) + "...";
  }
  return text;
};

export {
  shazamBaseUrl,
  billboardBaseUrl,
  formatSingleMusic,
  formatDataShazam,
  formatBillboardAlbum,
  formatBillboardArtist,
  formatSearchResult,
  getImages,
  constOptions1,
  constOptions2,
  shortenText,
};
