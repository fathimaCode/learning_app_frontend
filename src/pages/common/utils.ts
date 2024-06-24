class Utils{
 getCurrentDate = ()=>{
        const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const currentDate = month + "/" + date + "/" + year;
    return currentDate
    }
    getCurrentDateTime = () => {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
    
        const currentDate = `${month}/${date}/${year} ${hours}:${minutes}:${seconds}`;
        return currentDate;
    };
    
}
export default Utils