import sqlalchemy as _sql
import database as _database

# Tasks Table
class Tasks(_database.Base):
    __tablename__ = "tasks"
    taskID = _sql.Column(_sql.Integer, primary_key=True, unique=True)
    title = _sql.Column(_sql.String)
    details = _sql.Column(_sql.String)
    priority = _sql.Column(_sql.String)
    createDate = _sql.Column(_sql.Date)
    selectedDate = _sql.Column(_sql.Date)
    start = _sql.Column(_sql.Time)
    end = _sql.Column(_sql.Time)
    status = _sql.Column(_sql.String)
    



