// Generar un token de 6 dígitos
const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generar un ID de sesión único
const generateSessionId = () => {
  return 'session-' + Math.random().toString(36).substring(2, 15);
};

export { generateToken, generateSessionId };
