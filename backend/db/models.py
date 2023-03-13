from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum

from db.database import Base
class TaskStatus(PyEnum):
    pending = "pending"
    in_progress = "in_progress"
    in_review = "in_review"
    complete = "complete"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    eta = Column(String)
    status = Column(Enum(TaskStatus))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    class Config:
        orm_mode = True


class AuditTrace(Base):
    __tablename__ = "audit_trace"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    field = Column(String)
    old_value = Column(String)
    new_value = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())


    class Config:
        orm_mode = True