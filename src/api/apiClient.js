import AxiosInterceptor from "../component/AxiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useApiClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  return AxiosInterceptor({ accessToken, refreshToken, dispatch, navigate });
};
