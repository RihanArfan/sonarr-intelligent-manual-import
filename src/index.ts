import got from "got";
import { compareTwoStrings } from "string-similarity";
import { EpisodeResource, ManualImportResource, SeriesResource } from "./types";

const minSimilarityScore = 0.8;

const api = got.extend({
  prefixUrl: `${process.env.ENDPOINT}/api/v3`,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

const similarEpisodeName = (name: string) => {
  return episodes.find((episode) => {
    const similarityScore = compareTwoStrings(
      episode.title.toLowerCase(),
      name.toLowerCase()
    );

    return similarityScore > minSimilarityScore;
  });
};

// 1. get series id by name
const series = await api.get("series").json<SeriesResource[]>();
const seriesId = series.find(
  (series) => series.title === process.env.SERIES
)?.id;

if (!seriesId) {
  throw new Error(
    "Series not found. Make sure the series name matches exactly."
  );
}

// 2. get all episodes from the series
const episodes = await api
  .get("episode", {
    searchParams: { seriesId },
  })
  .json<EpisodeResource[]>();

// 3. get all files from the folder
const folderEntries = await api
  .get("manualimport", {
    searchParams: { folder: process.env.FOLDER },
  })
  .json<ManualImportResource[]>();

// 4. filter for files that are part of the series
const filesToImport = folderEntries.filter((file) => {
  // match only the episode name
  // file.name looks like "Looney Tunes Platinum Collection (1930) - V03E04 - Little Red Riding Rabbit (1080p BluRay x265).mkv" and we only want "Little Red Riding Rabbit"
  // IMPORTANT: This will only work if the naming format matches exactly! Change this to match your naming format. I was too lazy to make a generic naming handler.
  const fileName = file.name.match(/- V\d+E\d+ - (.*) \(/)![1];

  return similarEpisodeName(fileName);
});

// 5. format for manual import request
const importFiles = filesToImport.map((file) => {
  const fileName = file.name.match(/- V\d+E\d+ - (.*) \(/)![1];
  const episode = similarEpisodeName(fileName)!;

  return {
    path: file.path,
    seriesId,
    episodeIds: [episode.id],
    releaseGroup: process.env.RELEASE_GROUP,
  };
});

// 6. import files
await api.post("command", {
  json: {
    name: "ManualImport",
    importMode: "copy",
    files: importFiles,
  },
});

console.info("Successfully queued the import of the files");
