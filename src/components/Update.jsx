import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../features/userDetailSlice';

const Update = () => {
    const [newData, setNewData] = useState()
    const { id } = useParams()
    const { users, loading } = useSelector((state) => state.app);
    useEffect(() => {
        if (id) {
            const singleUser = users.filter((ele) => ele.id === id)
            setNewData(singleUser[0])
        }

    }, [])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(newData));
        navigate("/read")
      };

    const updatedData = (e) =>{
    setNewData({...newData, [e.target.name] : e.target.value})
    }
    console.log("NewData", newData)
    return (
        <div>
            <h2 className="my-2">Fill the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleSubmit} >
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        class="form-control"
                        required
                        value={newData && newData.name}
                        onChange={updatedData}
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        class="form-control"
                        value={newData && newData.email}
                        onChange={updatedData}

                        required
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        class="form-control"
                        value={newData && newData.age}
                        onChange={updatedData}

                        required
                    />
                </div>
                <div class="mb-3">
                    <input
                        class="form-check-input"
                        name="gender"
                        value="Male"
                        type="radio"
                        checked={newData && newData.gender === 'Male'}
                        onChange={updatedData}
                    />
                    <label class="form-check-label">Male</label>
                </div>
                <div class="mb-3">
                    <input
                        class="form-check-input"
                        name="gender"
                        value="Female"
                        type="radio"
                        checked={newData && newData.gender === 'Female'}
                        onChange={updatedData}

                    />
                    <label class="form-check-label">Female</label>
                </div>

                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Update