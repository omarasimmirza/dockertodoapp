from .model import Todo
#MongoDB driver
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
# import os

# client = AsyncIOMotorClient("mongodb+srv://omar8786270:" + DB_PASSWORD + "@alpaca1.zikdvpq.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
client = AsyncIOMotorClient("mongodb://db:27017", server_api=ServerApi('1'))
# MONGODB_URI = os.environ.get("MONGODB_URI")
# client = AsyncIOMotorClient(MONGODB_URI, server_api=ServerApi('1'))
database = client.TodoList
collection = database["todo"]

async def fetch_one_todo(title):
    document = await collection.find_one({"title":title})
    return document

async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return document

async def update_todo(title, desc):
    await collection.update_one({"title":title}, {"$set":{
        "description":desc}})
    document = await collection.find_one({"title":title})
    return document

async def remove_todo(title):
    await collection.delete_one({"title":title})
    return True