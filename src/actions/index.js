export const setSocket = (socket) => {
    console.log('SetSocket Action', socket)
    return {
        type: "SET_SOCKET",
        payload: socket
    }
}

export const setUser = (user) => {
    console.log('SetUser Action', user)
    return {
        type: "SET_USER",
        payload: user
    }
}

export const setChats = (chats) => {
    console.log('SetChats Action', chats)
    return {
        type: "SET_CHATS",
        payload: chats
    }
}

export const selectChat = (index) => {
    console.log('SelectChat Action', index)
    return {
        type: "CHAT_SELECTED",
        payload: index
    }
}

export const addChat = (chat) => {
    console.log('addChat Action', chat)
    return {
        type: "NEW_CHAT",
        payload: chat
    }
}

