import fastapi as _fastapi
import datetime as _dt
import sqlalchemy.orm as _orm
import database as _database, models as _models, schemas as _schemas
from sqlalchemy import update

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------------------------------------------------------------------------------------------------------------------------------------------

async def create_tasks(tasks: _schemas.Tasks, db: _orm.Session):
    tasks_obj = _models.Tasks(
         title=tasks.title, details=tasks.details, priority=tasks.priority, createDate=tasks.createDate,selectedDate=tasks.selectedDate, start=tasks.start, end=tasks.end, status=tasks.status
    )
    db.add(tasks_obj)
    db.commit()
    db.refresh(tasks_obj)
    return tasks_obj


async def get_tasks(db: _orm.Session):
    allTasks = db.query(_models.Tasks).filter(_models.Tasks.status == "Pending")
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
    pendingTasks = db.query(_models.Tasks).filter(_models.Tasks.status == "Pending").all()
    compTasks = db.query(_models.Tasks).filter(_models.Tasks.status == "Completed").all()

    pending_count = len(pendingTasks)
    completed_count = len(compTasks)
    totalTasks = pending_count + completed_count + 1
    

    return {
        "pendingTasks": pending_count,
        "completedTasks": completed_count,
        "totalTasks" : totalTasks
    }