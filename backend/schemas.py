import datetime as _dt
import pydantic as _pyd

# ---------------------------------------------

class _TasksBase(_pyd.BaseModel):
    title : str
    details : str
    priority : str
    createDate: _dt.date  
    selectedDate: _dt.date 
    start: _dt.time  
    end: _dt.time 
    status : str
class TasksCreate(_TasksBase):
    pass

class Tasks(_TasksBase):
    taskID : int 

    class Config:
        from_attributes = True

