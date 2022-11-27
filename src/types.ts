export interface ManualImportResource {
  id: number;
  path: string;
  relativePath?: string;
  folderName?: string;
  name: string;
  size: number;
  series?: any;
  seasonNumber: number;
  episodes?: any;
  episodeFileId?: number;
  releaseGroup?: string;
  quality: any;
  languages: any;
  qualityWeight: any;
  downloadId?: string;
  nullable: true;
  rejections: any;
}

export type EpisodeResource = {
  id: number;
  seriesId: number;
  tvdbId: number;
  episodeFileId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  airDate: string;
  airDateUtc: string;
  overview: string;
  hasFile: boolean;
  monitored: boolean;
  unverifiedSceneNumbering: boolean;
};

export interface SeriesResource {
  id: number;
  title: string;
}
