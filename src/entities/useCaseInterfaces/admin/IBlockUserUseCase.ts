export  interface IBlockUserUseCase{
    BlockUsers(userId: string): Promise<any>
}