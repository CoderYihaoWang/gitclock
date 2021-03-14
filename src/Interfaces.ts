export interface IUserProfile {
    username: string
    avatarUrl: string
}

export type type = 'morning'|'afternoon'|'evening'|'night'

export interface IStats {
    userProfile: IUserProfile|null
    commits: number[]
    type: type
}