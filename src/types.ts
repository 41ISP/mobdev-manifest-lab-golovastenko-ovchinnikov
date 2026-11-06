export interface IStrapiResponse<T> {
  data: T
  meta?: IMeta
}

export interface ITeam {
  id: number
  documentId: string
  Name: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  Players?: string[]
  Coach?: string
  VRS: number
  AveragePlayerAge?: number
  PrizeMoneyAmount?: number
  WonAMajor: boolean
  Logotype?: ILogotype
}

export type _TTeamInput = Omit<
    ITeam,
    "id" | "documentId" | "createdAt" | "updatedAt" | "publishedAt" | "image" | "Players"
>
export type TTeamInput = _TTeamInput & {
  Players: string
}


export interface ILogotype {
  id: number
  documentId: string
  name: string
  alternativeText: any
  caption: any
  focalPoint: any
  width: number
  height: number
  formats: IFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface IFormats {
  large: IMedia
  small: IMedia
  medium: IMedia
  thumbnail: IMedia
}

export interface IMedia {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface IMeta {
  pagination: IPagination
}

export interface IPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}