

export  interface IUnBlockUserUseCase{
    UnBlockUsers(userId: string): Promise<any>
}