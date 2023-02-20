import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  data: {
    id: string;
    email: string;
    stripeCustomerId: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: true, error: null }, () => {}]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    axios.defaults.headers.common["authorization"] = `Bearer ${accessToken}`;
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get("http://localhost:5000/api/me");

    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user._id,
          email: response.data.user.email,
          stripeCustomerId: response.data.user.stripeCustomerId,
        },
        loading: false,
        error: null,
      });
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
