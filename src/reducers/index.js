import { combineReducers } from 'redux';
import ChatsReducer from './reducer-chats';
import UserReducer from './reducer-user';
import activeChatReducer from './reducer-active-chat';
import SocketReducer from './reducer-socket'

const allReducers = combineReducers({
    chats: ChatsReducer,
    activeChat: activeChatReducer,
    user: UserReducer,
    socket: SocketReducer
})

export default allReducers;