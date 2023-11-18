const IsAuth = () => !!localStorage.getItem("refreshToken");

export { IsAuth };
