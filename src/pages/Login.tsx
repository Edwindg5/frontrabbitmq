// En App.js o en el archivo donde quieres usar el formulario de login
import React from 'react';
import LoginForm from './Login';

const App = () => {
  return (
    <div className="App">
      <LoginForm /> {/* Aquí se renderiza el formulario de login */}
    </div>
  );
};

export default App;
