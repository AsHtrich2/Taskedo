import fastapi as _fastapi
import sqlalchemy.orm as _orm
import services as _services, schemas as _schemas, models as _models
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import datetime as _dt

app = _fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---------------------------------------------------------------------------------------------------------------------------------------------------------

@app.post("/api/tasks", response_model=_schemas.Tasks)
async def create_tasks(tasks: _schemas.Tasks, db: _orm.Session = _fastapi.Depends(_services.get_db),):
    return await _services.create_tasks(tasks=tasks, db=db)

# @app.post("/api/tasks", response_model=List[_schemas.Tasks])
# async def create_tasks(tasks: List[_schemas.Tasks], db: _orm.Session = _fastapi.Depends(_services.get_db)):
#     return await _services.create_tasks(tasks=tasks, db=db)

@app.get("/api/ptasks", response_model=List[_schemas.Tasks])
async def get_pending_tasks(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.get_pending_tasks(db=db)

@app.get("/api/ctasks", response_model=List[_schemas.Tasks])
async def get_completed_tasks(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.get_completed_tasks(db=db)

@app.get("/api/atasks", response_model=List[_schemas.Tasks])
async def get_all_tasks(db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.get_all_tasks(db=db)

@app.get("/api/ttasks/{today}", response_model=List[_schemas.Tasks])
async def get_today_tasks(today: _dt.date, db: _orm.Session = _fastapi.Depends(_services.get_db)):
   return await _services.get_today_tasks(today=today,db=db)

@app.get("/api/tasks/{taskID}", status_code=200)
async def get_this_task( taskID: int, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.get_item(item_id=taskID, db=db, item_model=_models.Tasks,item_id_attr=_models.Tasks.taskID)

@app.put("/api/tasks/{taskID}", response_model=_schemas.Tasks)
async def update_task(taskID: int, tasks: _schemas.Tasks, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.update_task(taskID=taskID,tasks=tasks,db=db)

@app.put("/api/MarkTasks/{taskID}", response_model=_schemas.Tasks)
async def mark_task(taskID: int, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.mark_task(taskID=taskID,db=db)

@app.put("/api/UnMarkTasks/{taskID}", response_model=_schemas.Tasks)
async def unmark_task(taskID: int, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.unmark_task(taskID=taskID,db=db)
    
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