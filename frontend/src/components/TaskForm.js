import React, { useState } from 'react'

import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';


const TaskForm = ({ task, onSubmit }) => {
    const event_str = task === undefined ? 'Create New Task' : 'Update Task';

    const [title, setTitle] = useState((task && task.title) || '')
    const [eta, setEta] = useState((task && task.eta) || '')
    const [status, setStatus] = useState((task && task.status) || 'pending')
    const [requestStatus, setRequestStatus] = useState('idle')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        let finalTask = {
            title,
            eta,
            status
        }
        if (task !== undefined) finalTask['id'] = task.id;
        setRequestStatus('pending')
        await onSubmit(finalTask);
        setRequestStatus('idle')
        handleClose()
        if (task === undefined) {
            setTitle('')
            setEta('')
            setStatus('pending')
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {event_str}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{event_str} {task && task.id && " - "+task.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                disabled={task !== undefined || requestStatus !== "idle"}
                            />
                        </Form.Group>
                        <Form.Group controlId="eta">
                            <Form.Label>ETA</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter ETA"
                                value={eta}
                                onChange={(e) => setEta(e.target.value)}
                                required={true}
                                disabled={requestStatus !== "idle"}
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                disabled={requestStatus !== "idle"}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="in_review">In Review</option>
                                <option value="complete">Complete</option>
                            </Form.Control>
                        </Form.Group>
                        <Modal.Footer className='mt-2'>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={requestStatus !== "idle"}>{event_str}</button>
                            {requestStatus !== "idle" && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TaskForm