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
  quality: Quality;
  language: Language;
  qualityWeight: any;
  downloadId?: string;
  nullable: true;
  rejections: any;
}

export interface EpisodeResource {
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
}

export interface SeriesResource {
  id: number;
  title: string;
}

export interface CommandResponse {
  name: string;
  commandName: string;
  body: {
    files: ManualImportResource[];
  };
}

export interface Quality {
  quality: {
    id: number;
    name: string;
    source: string;
    resolution: number;
  };
  revision: {
    version: number;
    real: number;
    isRepack: boolean;
  };
}

export interface Language {
  id: number;
  name: string;
}
