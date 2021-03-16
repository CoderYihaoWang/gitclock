export interface IUserProfile {
    username: string
    name: string
    avatarUrl: string
}

export type IType = 'morning'|'afternoon'|'evening'|'night'

export interface IStats {
    userProfile: IUserProfile|null
    commits: number[]
    type: IType
}