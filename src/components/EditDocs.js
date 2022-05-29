import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Breadcrumbs, Link, Typography } from '@mui/material'

export default function EditDocs({ database }) {
    const collectionRef = collection(database, 'docsData')
    const isMounted = useRef()
    let params = useParams()
    const [docsDesc, setDocsDesc] = useState('')
    const [documentTitle, setDocumentTitle] = useState('')
    const getQuillData = (value) => {
        setDocsDesc(value)
    }

    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
            setDocumentTitle(docs.data().title)
            setDocsDesc(docs.data().docsDesc)
        })
    }

    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true
        getData()
    }, [])

    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, { docsDesc: docsDesc })
                .then(() => {
                    toast.success('Document Saved', {
                        autoClose: 2000
                    })
                })
                .catch(() => {
                    toast.error('Cannot Save Document', {
                        autoClose: 2000
                    })
                })
        }, 1000)
        return () => clearTimeout(updateDocsData)
    }, [docsDesc])

    return (
        <div className="editDocs-main">
            <ToastContainer />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    <Typography variant="h5" component="div" gutterBottom>
                        Home
                    </Typography>
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={`/editDocs/${params.id}`}
                >
                    <Typography variant="h5" component="div" gutterBottom>
                        {documentTitle}
                    </Typography>
                </Link>
            </Breadcrumbs>

            <div className="editDocs-inner">
                <ReactQuill
                    className="react-quill"
                    value={docsDesc}
                    onChange={getQuillData}
                />
            </div>
        </div>
    )
}
