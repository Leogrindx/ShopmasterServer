export const saparaterToArray = (object) => {
    const keys = Object.keys(object)
    const state = []
    for (let i = 0; i < keys.length; i++) {
        state.push({keys: keys[i], value: object[keys[i]]})
    }
    return state
}