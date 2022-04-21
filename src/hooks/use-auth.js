import { useContext, useEffect } from "react";
import { getProfile } from "../lib/api/auth";
import { AuthContext } from "../store/auth-context";
import useHttp from "./use-http";

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  const { setUser } = authCtx;
  const { data, status, sendRequest } = useHttp(getProfile, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
      }
    }
  }, [data, status, setUser]);
  return [data, status];
};
