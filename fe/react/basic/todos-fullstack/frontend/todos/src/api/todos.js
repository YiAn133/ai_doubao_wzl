import instance from "./config";
export const getTodos = async () => {
    const res = await instance.get('/todos');
    return res.data;
}

