export const cookieConfig={
    headers:{
        Authorization:localStorage.getItem('token'),
        'Content-Type':'application/json'
    },
}


export const setCookie=(name,value,days,expires)=>{
    let expires = " ";
    if(days){
        let date = new Date()
        date.setTime(date.getTime() + (days*24*60*60*1000))
        expires = "; expries=" + date.toUTCString();
    }
    document.cookie = name + '=' + (value || " ") + expires + "; path=/"
}