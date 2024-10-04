// Définition d'une interface pour notre objet Error personnalisé
interface CustomError extends Error {
  statusCode?: number; // La propriété 'statusCode' est optionnelle
}

// Déclaration de la fonction avec les types des paramètres et du retour
export const errorHandler = (statusCode: number, message: string): CustomError => {
  // Crée une instance de l'objet Error avec notre interface CustomError
  const error: CustomError = new Error(message);
  error.statusCode = statusCode; // Assigne le code d'état HTTP
  return error; // Retourne l'objet Error personnalisé
};
