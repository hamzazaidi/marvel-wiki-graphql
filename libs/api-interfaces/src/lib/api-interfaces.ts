export interface Config {
  id: string;
  gqlDomain: string;
}

export interface MarvelApiData {
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: ReadonlyArray<any>
}

export interface MarvelApiResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText:string;
  attributionHTML:string;
  etag:string;
  data: MarvelApiData
}
