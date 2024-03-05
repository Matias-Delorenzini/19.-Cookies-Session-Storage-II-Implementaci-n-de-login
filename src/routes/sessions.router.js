import express from 'express';
import UserManagerDAO from '../dao/users.dao.js';
const router = express.Router();

router.post("/register", async (req,res) => {
    const {first_name, last_name, email, age, password } = req.body
    try {
        await UserManagerDAO.registerUser(first_name, last_name, email, age, password);
        res.redirect("http://localhost:8080/profile");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserManagerDAO.findUserByEmail(email);

        if (!user) {
            return res.redirect("http://localhost:8080/login");
        }

        if (password !== user.password) {
            return res.redirect("http://localhost:8080/login");
        }

        req.session.user = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
        };
        res.redirect("http://localhost:8080/api/products/");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});    

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log("Error al hacer logout", err)
        } 
        res.redirect("http://localhost:8080/login");
    });
});

export default router;