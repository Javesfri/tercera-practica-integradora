export const isLogin=(req,res,next) =>{
    
    if(req.session.user){
        return res.redirect("http://localhost:8080/api/products/")
    }
    next()
}

export const getSession = (req, res) => {
    if (req.session.login) {
      //Si la sesion esta activa en la BDD
      res.redirect("/product", 200, {
        message: "Bienvenido/a a mi tienda",
      });
    }
    //No esta activa la sesion
    res.redirect("/api/session/login", 500, {
      //Mensaje de logueo
    });
  };

  export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("http://localhost:8080/api/session/login/");
    }
    next();
  };

  export const roleVerification= (rol) =>{
    return async (req,res,next) =>{
      const role=req.session.user.rol
      if(rol!=role ){
        return(res.status(401).send({error:" No posee los permisos necesarios para realizar la operacion"}))
      }
      next()
    }
    
  }