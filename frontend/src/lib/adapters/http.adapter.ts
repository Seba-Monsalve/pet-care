export const fetchUser = async () => {
  const res = await fetch("/api/user", {
    method: "GET",
  });

  const { user } = await res.json();
  return user;
};
