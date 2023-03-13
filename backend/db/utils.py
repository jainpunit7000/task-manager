from db.models import Task, AuditTrace, TaskStatus


def get_task_change(old_task: Task, new_task: Task):
    fields = ["title", "eta", "status"]
    old_task["status"] = old_task["status"].value
    new_task["status"] = new_task["status"].value
    new_task["eta"] = new_task["eta"].strftime('%Y-%m-%d')
    changes = { 
        field: {
            "from" : old_task[field],
            "to":  new_task[field]
        } 
        for field in fields if new_task[field] != old_task[field] 
    }
    db_audits = [ AuditTrace(task_id=old_task["id"], field=field, old_value=change["from"], new_value=change["to"]) for field, change in changes.items()]
    return db_audits