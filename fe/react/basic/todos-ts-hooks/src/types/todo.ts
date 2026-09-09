export interface Todo{
    id:string;
    text:string;
    completed:boolean;
}

// 联合类型，这类型是三个中的一个
export type FilterType = 'all' | 'completed' | 'uncompleted'