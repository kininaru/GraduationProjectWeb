export const toFormData = obj => {
    let ret = new FormData()
    for (let key of Object.keys(obj)) ret.append(key, obj[key])
    return ret
}