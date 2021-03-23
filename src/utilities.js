import apikey from "./key";

const shazamBaseUrl = 'https://shazam.p.rapidapi.com/';
const billboardBaseUrl = 'https://billboard-api2.p.rapidapi.com/';

const constOptions1 = {
  method: 'GET',
  headers: {
    'x-rapidapi-key' : apikey,
    'x-rapidapi-host': 'shazam.p.rapidapi.com'
  },
}

const constOptions2 = {
  method: 'GET',
  headers: {
    'x-rapidapi-key' : apikey,
    'x-rapidapi-host': 'billboard-api2.p.rapidapi.com'
  },
}

const formatSingleMusic = (data) => {
  return {
    key: data.key,
    title: data.title,
    artist: data.subtitle,
    coverImg: data.images.coverarthq,
    backgroundImg: data.images.background,
    shazam: data.url,
    artistID: data.artists[0].id,
    genre: data.genres.primary,
    album: data.sections[0].metadata[0].text,
    label: data.sections[0].metadata[1].text,
    released: data.sections[0].metadata[2].text,
    lyrics: data.sections[1].text.join("\n"),
    footer: data.sections[1].footer,
    youtubeCaption: data.sections[2].youtubeurl.caption,
    youtubeURL: data.sections[2].youtubeurl.actions[0].uri
  }
}

const formatDataShazam = (data) => {
  const newTracks = data.map(track => {
    return {
      'key': track.key,
      'title': track.title,
      'subtitle': track.subtitle,
      'image': track.images.coverart,
      'artistId': track.artists
    }
  })
  return newTracks;
}

const formatBillboardArtist = (data) => {
  let formatted = []
  for (let item in data) {
    formatted.push({
      'artist': data[item].artist,
      'key': data[item].rank
    })
  }
  return formatted;
}

const formatBillboardAlbum = (data) => {
  let formatted = []
  for (let item in data) {
    formatted.push({
      'album': data[item].album,
      'artist': data[item].artist,
      'key': data[item].rank
    })
  }
  return formatted;
}

export {
  shazamBaseUrl, 
  billboardBaseUrl, 
  formatSingleMusic, 
  formatDataShazam, 
  formatBillboardAlbum, 
  formatBillboardArtist, 
  constOptions1,
  constOptions2 
}