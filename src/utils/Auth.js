export const checkLoginStatus = () => {
  const token = localStorage.getItem("token");
  return !!token; // Mengembalikan true jika token ada, false jika tidak
};

export const isSignUpPage = (pathname) => {
  return pathname === "/signup";
};

export const isLoginPage = (pathname) => {
  return pathname === "/login";
};
