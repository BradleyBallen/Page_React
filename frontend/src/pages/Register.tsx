import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registro:", form);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="name" onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />
        <label>Contraseña</label>
        <input type="password" name="password" onChange={handleChange} required />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}
