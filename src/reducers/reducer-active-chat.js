export default function(state={ id: null, name: null, messages: []}, action) {
    console.log('activeReducer', action, state)
    switch(action.type){
        case 'CHAT_SELECTED':
            return action.payload
            
        default: return state;
           
    }
    
}