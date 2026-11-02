from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Todo(BaseModel):
    work:str
    completion:bool = False

ALLTodo:list[Todo] = [Todo(work="学习c语言",completion=True)]


@app.get('/')
async def getAll():
    return ALLTodo

@app.post('/AddTodo')
async def getAllTodos(todo:Todo):
    ALLTodo.append(todo)
    return {
        "work":todo.work,
        "completion":todo.completion
    }
