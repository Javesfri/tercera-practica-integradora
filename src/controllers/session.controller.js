export const createUser = async (req, res) => {
  res.redirect("/api/session/login");
};



export const testLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Invalidate User" });
    }
    //Genero la session de mi usuario
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      rol: req.user.rol,
      idCart:req.user.idCart
    };
    res.redirect("/api/products");
  } catch (error) {
    res.status(500).send.json({
      message: error.message,
    });
  }
};

export const destroySession = (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  req.logger.info("Sesion Finalizada");
  res.redirect("http://localhost:8080/api/session/login/");
};

export const currentUser = (req, res) => {
  const {email,first_name,last_name}={...req.session.user}
  res.render("current",{email,first_name,last_name})
};


