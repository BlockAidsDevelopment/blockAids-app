import uritemplate from "uri-template";

const prefs = {
  frontendServer: "https://next.fractal.id",
  authServer: "https://auth.next.fractal.id",
  resourceServer: "https://resource.next.fractal.id",

  client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",

  scope: "contact:read verification.basic:read verification.basic.details:read verification.liveness:read verification.liveness.details:read",
  redirect_uri: "http://localhost:3000/fractal/cb",
};

const loginTemplate = uritemplate.parse(
  `${prefs.frontendServer}/authorize{?client_id,redirect_uri,response_type,scope}`,
);

const tokenTemplate = uritemplate.parse(
  `${prefs.authServer}/oauth/token{?client_id,client_secret,code,grant_type,redirect_uri}`,
);

const getAccessToken = async (code: any) => {
  try {
    const response = await fetch(tokenTemplate.expand({
      ...prefs,
      code,
      grant_type: "authorization_code"
    }), {method: "POST"});
    const resJson = await response.json();
    return resJson.access_token;
  } catch (e) {
    console.log(e)
  }
}

const getUserInformation = async (accessToken: any) => {
  try {
    const response = await fetch(`${prefs.resourceServer}/users/me`, {headers: {Authorization: `Bearer ${accessToken}`}})
    return await response.json();
  } catch (e) {
    console.log(e)
  }
}

export default async function handler(req: any, res: any) {
  try {
    const code = req.body.code;
    const response = await getAccessToken(code);
    if (response) {
      const info = await getUserInformation(response);
      return res.send({token: response, info});
    }
    return res.send("Token isn't valid");
  } catch (e) {
    console.log(e);
    return res.send("Server Error");
  }
}

