const getJWTClaimsFromToken = (token) => {
    const payload = token.split(".")[1];

    let decodedPayload = atob(payload);

    return JSON.parse(decodedPayload);
}