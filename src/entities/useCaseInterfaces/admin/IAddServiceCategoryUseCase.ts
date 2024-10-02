

export interface IAddServiceCategoryUseCase{
    addServiceCategory(type_name: string, description: string): Promise<any>;

}