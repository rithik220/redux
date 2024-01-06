import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://65979677668d248edf230549.mockapi.io/curd", {
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
        return rejectWithValue(error.response);
    }
});

// Showing the user data in Read Posts page

export const showUser = createAsyncThunk(
    "showUser",
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://65979677668d248edf230549.mockapi.io/curd", {
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
                state.users = action.payload; // Assuming the payload is an array
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default userDetail.reducer;
