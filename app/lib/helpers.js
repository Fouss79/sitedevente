// lib/helpers.js
export const getImageUrl = (path) => {
  if (!path) return ""; // sécurité si path vide
  return `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(/\\/g, "/")}`;
};
