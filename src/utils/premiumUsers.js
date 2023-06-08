export const isPremium =(req,res,next) =>{
    const userRol = req.session.user.rol;
    if(userRol==="Premium")
      return true
    return false
  }