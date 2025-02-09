import axios from 'axios'
import {config} from "../config";

export async function setConfig() {
    const data = {
        responseConfiguration: {
            sub: "test1",
            emailVerified: true
        },
        clientConfiguration: {
            clientId: "HGIOgho9HIRhgoepdIOPFdIUWgewi0jw",
            scopes: ["openid", "phone", "email"],
            publicKey: config.publicKey,
            redirectUrls: [
                `http://localhost:${config.port}/oidc/authorization-code/callback`,
            ],
            claims: [
                "https://vocab.account.gov.uk/v1/passport",
                "https://vocab.account.gov.uk/v1/address",
                "https://vocab.account.gov.uk/v1/drivingPermit",
                "https://vocab.account.gov.uk/v1/socialSecurityRecord",
                "https://vocab.account.gov.uk/v1/coreIdentityJWT",
                "https://vocab.account.gov.uk/v1/returnCode",
            ]
        }
    };

    await axios.post(`${config.simUrl}/config`, data).catch(error => {
        console.log(error.response.data.errors)
    });
}

export async function setConfig2() {
    const data = {
        responseConfiguration: {
            sub: "test2",
            email: "test2@test.com",
            emailVerified: true,
            phoneNumber: "123456",
            phoneNumberVerified: true
        },
    };

    await axios.post(`${config.simUrl}/config`, data).catch(error => {
        console.log(error.response.data.errors)
    });
}
