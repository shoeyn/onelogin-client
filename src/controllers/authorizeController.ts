import {Request, Response} from "express";
import {setConfig, setConfig2} from "./configController";
import {config} from "../config";
import { stringify } from "node:querystring";

export default async (_req: Request, res: Response) => {
    await setConfig();
    await setConfig2();

    const queryParams = stringify({
        client_id: 'HGIOgho9HIRhgoepdIOPFdIUWgewi0jw',
        redirect_uri: `http://localhost:${config.port}/oidc/authorization-code/callback`,
        response_type: 'code',
        scope: 'openid email phone',
        state: 'a7e4bfd39d3eaa57c27775744f22c5a2',
        claims: JSON.stringify({
            userinfo: {
                "https://vocab.account.gov.uk/v1/coreIdentityJWT": null,
                "https://vocab.account.gov.uk/v1/address": null,
                "https://vocab.account.gov.uk/v1/drivingPermit": null,
                "https://vocab.account.gov.uk/v1/returnCode": null
            }
        }),
        nonce: '3eb5b04ca8e1baf7dea15b7fb7ac05a6',
        prompt: 'login',
        vtr: JSON.stringify(["Cl.Cm.P2"]),
        ui_locales: 'en',
    })

    res.redirect(`${config.simUrl}/authorize?${queryParams}`);
}
