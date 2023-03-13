import React, { useState, useEffect } from "react";

import Modal from 'react-bootstrap/Modal';

import { getAuditTrail } from "../api/taskApi";
import { formatDate, splitAndCapitalize } from "../utils/helper";


const AuditTrail = ({ task_id, created_at, showAudit, handleAuditClose, handleAuditShow, showSnackbar }) => {
    const [auditTrail, setAuditTrail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTaskAuditTrail = async () => {
            const auditData = await getAuditTrail(task_id);
            if (auditData.data === undefined) {
                showSnackbar("Error fetching audit trail");
                handleAuditClose();
                return;
            }
            setAuditTrail(auditData.data);
            setIsLoading(false);
        };
        fetchTaskAuditTrail();
    }, [task_id]);

    return (
        <>
            <Modal show={showAudit} onHide={handleAuditClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Audit Trail {task_id && " - "+task_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "30%", overflow: "scroll" }}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {auditTrail.map((audit) => (
                                <li key={audit.id} className="mb-2">
                                    <span className="card-subtitle mb-2 text-muted">{formatDate(audit.timestamp)} -  {splitAndCapitalize(audit.field)} changed</span>
                                    {
                                        audit.field === "eta" ? 
                                        <p style={{ paddingLeft: "12px" }}>{formatDate(audit.old_value)} -&gt; {formatDate(audit.new_value)}</p>:
                                        <p style={{ paddingLeft: "12px" }}>{splitAndCapitalize(audit.old_value)} -&gt; {splitAndCapitalize(audit.new_value)}</p>
                                    }
                                </li>
                            ))}
                            <li><span className="card-subtitle mb-2 text-muted">{formatDate(created_at)} - Issue Created</span></li>
                        </ul>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AuditTrail;
