import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

// 1. form input : onChange -- state
// 2. send API: axios
//3. logic after create: navigate
// 4. cancle button : Link 

const Create = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [inStock, setInStock] = useState(false)
    const navigate = useNavigate()

    const [errorList, setErrorList] = useState([])

    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.post(`http://localhost:8000/api/stores/new`, {name, description, price, inStock})
            .then(res=>{
                const createdStore = res.data
                navigate(`/stores/${createdStore._id}`)
            })
            .catch(error=>{
                const errorRespondData = error.response.data.errors
                const tempErrorArray = []
                for(const eachKey in errorRespondData){
                    tempErrorArray.push(errorRespondData[eachKey].message)
                }
                setErrorList(tempErrorArray)
            })
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
                {
                    errorList.map((eachError, idx) => (
                        <p className='text-danger' key={idx}>{eachError}</p>
                    ))
                }
            </form>
        </div>
    )
}

export default Create
