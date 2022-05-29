import * as React from 'react'
import { Box, Modal } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
}

export default function ModalComponent({
    open,
    onClose,
    title,
    setTitle,
    addData
}) {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input
                        placeholder="Add the Title"
                        className="add-input"
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />
                    <div className="button-container">
                        <button className="add-docs" onClick={addData}>
                            Add
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
