let isEditor = () => {
    return  localStorage.getItem('user') == "samu"
}
export default isEditor