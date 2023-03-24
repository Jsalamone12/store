import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
// 1. get id from params (useParams)
// 2. use the id to send API and display on load (axios useEffect)
// 3. var change: useState

const Detail = () => {
    const [store, setStores] = useState(null)

    const { _id } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/stores/${_id}`)
            .then(res=>setStores(res.data))
            .catch(error=>console.log(error))
    },[_id])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/stores/${_id}`)
            .then(res => navigate(`/`))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {
                store ?
                    <div className='container'>
                        <h2>Name: {store.name}</h2>
                        <h2>Description: {store.description}</h2>
                        <h2 className='text-success'>Price: {store.price}</h2>
                        <h2>in Stock: {store.inStock && "This is a remote position"}</h2>
                        <Link className='btn btn-outline-warning text-black me-2' to={`/stores/${_id}/update`}>Edit</Link>
                        <Link className='btn btn-outline-warning text-black me-2' to='/'>Back</Link>
                        <button type="button" className='btn btn-outline-danger' onClick={handleDelete}>Delete</button>
                    </div> :
                    <h1>loading...</h1>
            }

        </div>
    )
}

export default Detail
