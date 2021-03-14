export interface IUserProfile {
    username: string
    avatarUrl: string
}

export interface IStats {
    userProfile: IUserProfile|null
    commits: number[]
    type: 'morning'|'afternoon'|'evening'|'night'
}