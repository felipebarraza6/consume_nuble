
export const login_reducer = (state, action) => {

    switch (action.type) {
        case "VISIBLE":
            return{
                ...state,
                login:true
            }
        
        case "NOVISIBLE":
            return{
                ...state,
                login:false
            }        

        case "LOGIN":            
            localStorage.setItem("access_token", JSON.stringify(action.payload.access_token))
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            return {
                ...state,
                authenticated: true,                
                token: action.payload.access_token,
                user: action.payload.user,
                login:false
            }
            
        case "LOGOUT":
            localStorage.clear()
            return {
                ...state,
                authenticated: false,
                token: null,
                user: null                
            }
    
        default:
            return state
    }
}