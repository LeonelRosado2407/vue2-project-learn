export const UserLogged = localStorage.getItem('isAuth') == "true" ? true : false;

export const UpdateAuth = (isAuth = false) => {
    localStorage.setItem('isAuth', isAuth);
    window.location.reload();
}

export const SaveUserData = (data,rol) =>{
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('rol',JSON.stringify(rol));
}

export const GetUserData = () =>{
    if(!localStorage.getItem('userData') && !localStorage.getItem('rol')) return null;
    
    return {
        usuario: JSON.parse(localStorage.getItem('userData')),
        rol: JSON.parse(localStorage.getItem('rol'))
    }
}