import {Request, Response} from "express";
import {importPKCS8, JWTPayload, SignJWT} from "jose";
import {randomUUID} from "node:crypto";
import axios from "axios";
import {config} from "../config";

const createValidClientAssertion = async (
    payload: JWTPayload
): Promise<string> => {
    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "RS256",
        })
        .sign(await importPKCS8(config.privateKey, 'RS256'));
};

export default async (req: Request, res: Response) => {

    if (!req.query.code) {
        return res.render('error', { title: 'Error', msg: 'No code provided' })
    }

    const clientAssertion = await createValidClientAssertion({
        iss: 'HGIOgho9HIRhgoepdIOPFdIUWgewi0jw',
        sub: 'HGIOgho9HIRhgoepdIOPFdIUWgewi0jw',
        aud: 'http://localhost:3000/token',
        jti: randomUUID(),
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
    });

    const tokenResponse = await axios.post(`${config.simUrl}/token`, {
        grant_type: "authorization_code",
        code: req.query.code,
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        redirect_uri: `http://localhost:${config.port}/oidc/authorization-code/callback`,
        client_assertion: clientAssertion,
    })

    console.log(tokenResponse.data)

    const userResponse = await axios.get(`${config.simUrl}/userinfo`, {
        headers: {
            'Authorization': `Bearer ${tokenResponse.data.access_token}`
        }
    })

    res.render('token', { title: 'User Details', params: userResponse.data })
}