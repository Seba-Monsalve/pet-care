import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import { PrivateRoute } from "./auth/routes/PrivateRoute";
import { useAuthStore } from "./store/auth.store";
import { Unauthorized } from "./pages/Unauthorized";
import PetsPage from "./pets/pages/PetsPage";
import { AddPetPage, PetPage } from "./pets/pages";
import { UpdatePetPage } from "./pets/pages/UpdatePetPage";
import { VetPage } from "./vets/pages/VetPages";
import { UpdateProfilePage } from "./auth/pages";
import LostPets from "./pets/pages/LostPetsPage";
import LostPetsDetailsPage from "./pets/pages/LostPetsDetailsPage";

function AppRouter() {
  const { user } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuth={!!user}>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index path="/dashboard" element={<PetsPage />} />
          <Route path="/dashboard/pets/new" element={<AddPetPage />} />
          <Route path="/dashboard/pets/:petId" element={<PetPage />} />
          <Route
            path="/dashboard/pets/update/:petId"
            element={<UpdatePetPage />}
          />
          <Route path="/dashboard/profiles/update/" element={<UpdateProfilePage />} />
          <Route path="/dashboard/vets" element={<VetPage />} />
          <Route path="/dashboard/lost-pets" element={<LostPets />} />
          <Route path="/dashboard/lost-pets/:id" element={<LostPetsDetailsPage />} />
        </Route>
        <Route path="/pitbull" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
