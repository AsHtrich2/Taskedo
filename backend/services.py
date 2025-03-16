import fastapi as _fastapi
import datetime as _dt
import sqlalchemy.orm as _orm
import database as _database, models as _models, schemas as _schemas
from sqlalchemy import update
from typing import List

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------------------------------------------------------------------------------------------------------------------------------------------

# async def create_tasks(tasks: _schemas.Tasks, db: _orm.Session):
#     tasks_obj = _models.Tasks(
#          title=tasks.title, details=tasks.details, priority=tasks.priority, createDate=tasks.createDate,selectedDate=tasks.selectedDate, start=tasks.start, end=tasks.end, status=tasks.status
#     )
#     db.add(tasks_obj)
#     db.commit()
#     db.refresh(tasks_obj)
#     return tasks_obj

async def create_tasks(tasks: List[_schemas.Tasks], db: _orm.Session):
    created_tasks = []
    for task in tasks:
        tasks_obj = _models.Tasks(
            title=task.title, 
            details=task.details, 
            priority=task.priority, 
            createDate=task.createDate, 
            selectedDate=task.selectedDate, 
            start=task.start, 
            end=task.end, 
            status=task.status
        )
        db.add(tasks_obj)
        db.commit()
        db.refresh(tasks_obj)
        created_tasks.append(tasks_obj)
    
    return created_tasks



async def get_pending_tasks(db: _orm.Session):
    allTasks = db.query(_models.Tasks).filter(_models.Tasks.status == "Pending").order_by(_models.Tasks.selectedDate.asc(), _models.Tasks.start.asc())
    return list(map(_schemas.Tasks.model_validate, allTasks))

async def get_completed_tasks(db: _orm.Session):
    allTasks = db.query(_models.Tasks).filter(_models.Tasks.status == "Completed").order_by(_models.Tasks.selectedDate.asc(), _models.Tasks.start.asc())
    return list(map(_schemas.Tasks.model_validate, allTasks))

async def get_all_tasks(db: _orm.Session):
    allTasks = db.query(_models.Tasks).order_by(_models.Tasks.selectedDate.asc(), _models.Tasks.start.asc())
    return list(map(_schemas.Tasks.model_validate, allTasks))

async def get_today_tasks(today,db: _orm.Session):
    allTasks = db.query(_models.Tasks).filter(_models.Tasks.selectedDate == today).order_by(_models.Tasks.selectedDate.asc(), _models.Tasks.start.asc())
    return list(map(_schemas.Tasks.model_validate, allTasks))


async def _item_selector(item_id, db, item_model, item_id_attr):
    item = (db.query(item_model).filter(item_id_attr == item_id).first())
    if item is None:
        raise _fastapi.HTTPException(status_code=404, detail="Lead does not exist")

    return item

async def get_item(item_id, db, item_model, item_id_attr):
    item = await _item_selector(item_id, db, item_model, item_id_attr)

    return item

# ---------------------------------------------------------------------------------------------------------------------------------------------------------

async def delete_task(taskID, db: _orm.Session):
    task = (db.query(_models.Tasks).filter(_models.Tasks.taskID == taskID).first())
    db.delete(task)
    db.commit()

async def update_task(taskID, tasks: _schemas.TasksCreate, db: _orm.Session):
    task = (db.query(_models.Tasks).filter(_models.Tasks.taskID == taskID).first())

    task.title = tasks.title
    task.details = tasks.details
    task.priority = tasks.priority
    task.createDate = tasks.createDate
    task.selectedDate = tasks.selectedDate
    task.start = tasks.start
    task.end = tasks.end
    task.status = tasks.status

    db.commit()
    db.refresh(task)

    return _schemas.Tasks.from_orm(task)

async def mark_task(taskID, db: _orm.Session):
    task = (db.query(_models.Tasks).filter(_models.Tasks.taskID == taskID).first())
    task.status = "Completed"

    db.commit()
    db.refresh(task)

    return _schemas.Tasks.from_orm(task)

async def get_stats(db: _orm.Session):
    today = _dt.date.today().strftime('%Y-%m-%d')
    pendingTasks = db.query(_models.Tasks).filter(_models.Tasks.status == "Pending").all()
    compTasks = db.query(_models.Tasks).filter(_models.Tasks.status == "Completed").all()
    todayTasks = db.query(_models.Tasks).filter(_models.Tasks.selectedDate == today).all()
    pending_count = len(pendingTasks)
    completed_count = len(compTasks)
    totalTasks = pending_count + completed_count + 1
    total_today = len(todayTasks)
    

    return {
        "pendingTasks": pending_count,
        "completedTasks": completed_count,
        "totalTasks" : totalTasks,
        "totaltoday" : total_today
    }