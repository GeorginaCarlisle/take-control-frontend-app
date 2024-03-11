// The code in this file was copied from the 'Moments' walkthrough project.
import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp)
};

export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp')
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp')
};
