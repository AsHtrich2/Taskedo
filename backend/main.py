import fastapi as _fastapi
import sqlalchemy.orm as _orm
import services as _services, schemas as _schemas, models as _models
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = _fastapi.FastAPI()

# ---------------------------------------------------------------------------------------------------------------------------------------------------------

@app.post("/api/tasks", response_model=_schemas.Tasks)
async def create_tasks(tasks: _schemas.Tasks, db: _orm.Session = _fastapi.Depends(_services.get_db),):
    return await _services.create_tasks(tasks=tasks, db=db)

@app.get("/api/tasks", response_model=List[_schemas.Tasks])
async def get_tasks(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.get_tasks(db=db)

@app.get("/api/tasks/{taskID}", status_code=200)
async def get_this_task( taskID: int, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.get_item(item_id=taskID, db=db, item_model=_models.Tasks,item_id_attr=_models.Tasks.taskID)

@app.put("/api/tasks/{taskID}", response_model=_schemas.Tasks)
async def update_task(taskID: int, tasks: _schemas.Tasks, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.update_task(taskID=taskID,tasks=tasks,db=db)

@app.put("/api/MarkTasks/{taskID}", response_model=_schemas.Tasks)
async def mark_task(taskID: int, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.mark_task(taskID=taskID,db=db)
    
@app.delete("/api/tasks/{taskID}", status_code=204)
async def delete_task(taskID: int, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.delete_task(taskID=taskID,db=db)

@app.get("/api/stats", status_code=200)
async def get_stats( db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.get_stats(db=db)
# ---------------------------------------------------------------------------------------------------------------------------------------------------------

@app.get("/api")
async def root():
    return {"message": "Chalra h bhai"}

# ---------------------------------------------------------------------------------------------------------------------------------------------------------