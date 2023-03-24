import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'


// Get the details to pre-populate
//1. get id from params (useParams())
// 2. use the id to get info from api : axios
// 3. display info on load: useEffect
// Creating the form
// 4 form input : onchange , useState
// 5. form submit : handelSubmit
// 6. send formData into api ; axios
// 7. logic after update ; redirect to detail page 

const Edit = () => {
    //from create page 
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(70000)
    const [inStock, setInStock] = useState(false)
    const navigate = useNavigate()

    const [errorList, setErrorList] = useState([])

    //from details 
    const { _id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/stores/${_id}`)
            .then(res => {
                const job = res.data
                console.log(res)
                setName(job.name)
                setDescription(job.description)
                setPrice(job.price)
                setInStock(job.InStock)
            })
            .catch(error => console.log(error))
    }, [_id])


    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`http://localhost:8000/api/stores/${_id}/update`, { name, description, price, inStock })
            .then(res => navigate(`/stores/${_id}`))
            .catch(error => {
                const errorRespondData = error.response.data.errors
                const tempErrorArray = []
                for (const eachKey in errorRespondData) {
                    tempErrorArray.push(errorRespondData[eachKey].message)
                }
                setErrorList(tempErrorArray)
            })
    }


    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/stores/${_id}`)
            .then(res => navigate(`/`))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={name} className='form-control'
                        onChange={event => setName(event.target.value)} />
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" name="description" value={description} className='form-control'
                        onChange={event => setDescription(event.target.value)} />
                </div>
                <div>
                    <label>Price: </label>
                    <input type="number" name="price" value={price} className='form-control'
                        onChange={event => setPrice(event.target.value)} />
                </div>
                <div>
                    <label>In Stock: </label>
                    <input type="checkbox" name="inStock" checked={inStock}
                        onChange={event => setInStock(event.target.checked)} />
                </div>
                <button className='btn btn-outline-success me-2 text-black' type="submit">Submit</button>
                <Link className='btn btn-outline-warning text-black' to='/'>Cancel</Link>
                <button type="button" className='btn btn-outline-danger'
                    onClick={handleDelete}>Delete</button>
                {
                    errorList.map((eachError, idx) => (
                        <p className='text-danger' key={idx}>{eachError}</p>
                    ))
                }
            </form>
        </div>
    )
}

export default Edit
