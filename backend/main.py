import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import TaskIn, TaskOut, AuditTrace

import db.crud as crud
from db.database import Base, engine, SessionLocal
from db.models import Task


Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return "Server is running"

@app.get("/tasks/", response_model=list[TaskOut])
def read_tasks():
    db = SessionLocal()
    tasks = crud.get_tasks(db)
    return tasks


@app.get("/tasks/{task_id}/", response_model=TaskOut)
def read_task(task_id: int):
    db = SessionLocal()
    filtered_task = crud.get_task(db, task_id)
    if not filtered_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskOut.from_orm(filtered_task)


@app.post("/tasks/", response_model=TaskOut)
def create_task(task: TaskIn):
    try:    
        db = SessionLocal()
        db_task = Task(title=task.title, eta=task.eta, status=task.status)
        created_task = crud.create_task(db, db_task)
        return TaskOut.from_orm(created_task)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error\n{e}")


@app.put("/tasks/{task_id}/", response_model=TaskOut)
def update_task(task_id: int, task: TaskIn):
    db_task = Task(id=task_id, title=task.title, eta=task.eta, status=task.status)
    db = SessionLocal()
    updated_task = crud.update_task(db, task_id, db_task)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskOut.from_orm(updated_task)


@app.get("/tasks/{task_id}/audit_trace", response_model=list[AuditTrace])
def read_task_audit_trace(task_id: int):
    db = SessionLocal()
    audit_trace = crud.read_task_audit_trace(db, task_id)
    return audit_trace


if __name__ == "__main__":
    uvicorn.run(
        "main:app", host="0.0.0.0", port=8000, workers=1, log_level="info", reload=True
    )