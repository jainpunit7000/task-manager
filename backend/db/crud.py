from sqlalchemy.orm import Session

from db.models import Task, AuditTrace
from db.utils import get_task_change

def get_tasks(db: Session):
    try:
        return db.query(Task).all()
    finally:
        db.close()

def create_task(db: Session, task: Task):
    try:
        db.add(task)
        db.commit()
        db.refresh(task)
        return task
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_task(db: Session, task_id: int):
    try:
        return db.query(Task).filter(Task.id == task_id).first()
    finally:
        db.close()

def update_task(db: Session, task_id: int, task: Task):
    try:
        db_task = db.query(Task).filter(Task.id == task_id).first()
        if db_task:
            db_audits = get_task_change(old_task=db_task.__dict__, new_task=task.__dict__)
            db_task.title = task.title
            db_task.eta = task.eta
            db_task.status = task.status

            db.add_all(db_audits)
            db.commit()
            db.refresh(db_task)
            return db_task
        else:
            return None
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def read_task_audit_trace(db: Session, task_id: int):
    try:
        return db.query(AuditTrace).filter(AuditTrace.task_id == task_id).order_by(AuditTrace.timestamp.desc()).all()
    finally:
        db.close()
