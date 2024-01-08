import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("createUser", async (data) => {
    const response = await fetch("https://6597cd23668d248edf236f79.mockapi.io/r-toolkit/usersData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        console.log("state", response);
        return result;
    } catch (error) {
        return isRejectedWithValue(error.message);
    }
});

// Showing the user data in Read Posts page

export const showUser = createAsyncThunk(
    "showUser",
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://6597cd23668d248edf236f79.mockapi.io/r-toolkit/usersData", {
                method: "GET",
            }
            );
            const data = await response.json(); // Parse the JSON response
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete the user data in Read Posts page

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://6597cd23668d248edf236f79.mockapi.io/r-toolkit/usersData/${id}`,
                { method: "DELETE" }
            );
            const data = await response.json(); // Parse the JSON response
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete the user data in Read Posts page

export const editteUser = createAsyncThunk(
    "editeUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://6597cd23668d248edf236f79.mockapi.io/r-toolkit/usersData/${id}`,
                { method: "" }
            );
            const data = await response.json(); // Parse the JSON response
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
    const response = await fetch(`https://6597cd23668d248edf236f79.mockapi.io/r-toolkit/usersData/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        console.log("state", response);
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); // This line assumes action.payload is an array, modify accordingly
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload
                if (id) {
                    state.users = state.users.filter((ele) => ele.id !== id)
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(editteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editteUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(editteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((ele) =>
                ele.id === action.payload.id ? action.payload : ele
                )})
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default userDetail.reducer;
