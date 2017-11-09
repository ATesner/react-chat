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

export const selectChat = (chat) => {
    console.log('SelectChat', chat.name)
    return {
        type: "CHAT_SELECTED",
        payload: chat
    }
}

