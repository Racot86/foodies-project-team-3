import { Routes, Route } from 'react-router-dom';
import RecipeDetails from '../src/pages/recipe-details/RecipeDetails';
import SignInForm from '../src/components/signInForm/SignInForm'; 
import SignUpForm from '../src/components/signUpForm/SignUpForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignInForm onClose={() => {}} />} />
<Route path="/signup" element={<SignUpForm onClose={() => {}} />} />

      <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
    </Routes>
  );
};

export default AppRoutes;
