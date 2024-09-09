const initialState = {
    data : [],
    serverErrors : []
}

export default function ReviewReducers(state = initialState, action) {
    switch(action.type) {
        case "SET_REVIEWS": {
            return {...state, data: action.payload}
        }
        case "ADD_REVIEW": {
            return {...state, data: [...state.data, action.payload]}
        }
        default : {
            return state
        }
    } 
}