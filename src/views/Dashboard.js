import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

// 1. call API on Load: axios, UseEffect
// 2. variable change: useState
// 3. Links: Link

const Dashboard = () => {
    const [storeList, SetStoreList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/stores`)
            .then(res => {
                SetStoreList(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    const handleDelete = (deleteId=>{
        axios.delete(`http://localhost:8000/api/stores/${deleteId}`)
            .then(res=>{
                const filteredList = storeList.filter((eachStore)=>eachStore._id !== deleteId)
                SetStoreList(filteredList)
            })
            .catch(error=>console.log(error))
    })

    return (
        <div>
            <p><Link to="/stores/new"> Create New Product</Link></p>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th colSpan={(2)}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        storeList.map((eachStore, idx) => (
                            <tr key={idx}>
                                <td> <Link to={`/stores/${eachStore._id}`}>{eachStore.name} </Link></td>
                                <td>{eachStore.description}</td>
                                <td>{eachStore.price}</td>
                                <td>{eachStore.inStock ? "Yes" : "No"}</td>
                                <td> <Link className='btn btn-outline-warning text-black me-2' to={`/stores/${eachStore._id}`}>Edit</Link>
                                    <button className='btn btn-outline-danger text-black' onClick={() => handleDelete(eachStore._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
