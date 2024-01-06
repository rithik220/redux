import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser } from '../features/userDetailSlice'

const  Read = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showUser());
      }, []);

    return (
        <div>
            <h1>Users Data</h1>
            <div>
                <div class="card w-50 mx-auto">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Read