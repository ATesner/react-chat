export default function(state=null, action) {
    
    switch(action.type){

        case "SET_CHATS":
            return action.payload

        case "NEW_CHAT":
            return [...state, action.payload]
            
        default:
            return state
    }

}