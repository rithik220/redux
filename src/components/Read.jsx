import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/userDetailSlice'
import CustomModal from './CustomModal'
import { Link } from 'react-router-dom'

const Read = () => {
    const [id, setId] = useState()
    const [showPoppup, setShowPopup] = useState(false)
    const dispatch = useDispatch()
    const { users, loading } = useSelector((state) => state.app)
    useEffect(() => {
        dispatch(showUser());
    }, []);


    if (loading) {
        return (<h2>let's gooo...</h2>)
    }

    return (
        <div>
            {showPoppup && <CustomModal id={id} showPoppup={showPoppup} setShowPopup={setShowPopup}/>}
            <h1>Users Data</h1>
            {users &&
                users.map((ele) => (
                        <div key={ele.id}class="card w-50 mx-auto">
                            <div class="card-body">
                                <h5 class="card-title">{ele.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{ele.email}</h6>
                                <p class="card-text">{ele.gender}</p>
                                <button type="button" class="btn btn-primary mx-2" onClick={() =>[setId(ele.id), setShowPopup(true)]}>View</button>
                                <Link to={`/edit/${ele.id}`} type="button" class="btn btn-info mx-2">Edit</Link>
                                <Link   type="button" onClick= {() => dispatch(deleteUser(ele.id))} class="btn btn-danger mx-2">Delete</Link>
                            </div>
                        </div>
                ))}
        </div>
    )
}

export default Read