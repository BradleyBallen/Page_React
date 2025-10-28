import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos listos para enviar:", { email, password });
    // Aquí luego llamarás a tu endpoint:
    // await loginService(email, password)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
            alt="Logo"
            className="w-16 h-16 mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            English Learning Portal
          </h1>
          <p className="text-gray-500 text-sm mt-1">Iniciaa sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
