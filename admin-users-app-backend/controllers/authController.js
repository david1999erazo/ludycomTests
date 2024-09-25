const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(401).send("Usuario no encontrado");

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) return res.status(401).send("Contraseña incorrecta");

      const token = jwt.sign({ id: user.id }, "secret_key", {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  );
});

app.listen(5000, () => {
  console.log("Servidor en puerto 5000");
});
