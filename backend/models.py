from pydantic import BaseModel
from pydantic.types import constr
from datetime import datetime, date

from db.models import TaskStatus

class TaskIn(BaseModel):
    title: constr(min_length=1)
    eta: date
    status: TaskStatus

    class Config:
        orm_mode = True


class TaskOut(TaskIn):
    id: int
    title: constr(min_length=1)
    eta: date
    status: TaskStatus
    created_at: datetime

    class Config:
        orm_mode = True

class AuditTrace(BaseModel):
    id: int
    task_id: int
    field: constr(min_length=1)
    new_value: constr(min_length=1)
    old_value: constr(min_length=1)
    timestamp: datetime

    class Config:
        orm_mode = True