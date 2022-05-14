import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PublicLayout from "./components/Public/PublicLayout";
import PrivateLayout from "./components/Private/PrivateLayout";

function App() {
  const publicRoutes = (
    <Route element={<PublicLayout />}>
      <Route index path="/" element={<div>Login</div>} />
      <Route path="/registrarse" element={<div>Registro</div>} />
      <Route path="*" element={<div>No encontrada</div>} />
    </Route>
  );

  const userRoutes = (
    <Route element={<PrivateLayout />}>
      <Route index path="/" element={<div>Inicio</div>} />
      <Route path="perfil" element={<div>Perfil</div>} />
      <Route path="diario" element={<div>Diario</div>} />
      <Route path="examenes" element={<div>Examenes</div>} />
      <Route path="recomendaciones" element={<div>Recomendaciones</div>} />
      <Route path="tratamiento" element={<div>Tratamiento</div>} />
      <Route path="*" element={<div>No encontrada</div>} />
      {/* Por si no existe la ruta */}
    </Route>
  );

  const getRoutes = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) return userRoutes;
    return publicRoutes;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          {getRoutes()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
