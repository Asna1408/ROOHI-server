export  interface IDeleteServiceCategoryUseCase{

    deleteServiceCategory(id: string): Promise<any>;

}