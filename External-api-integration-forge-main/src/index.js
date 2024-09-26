import Resolver from '@forge/resolver';
import api, { route, fetch } from '@forge/api'; 

const resolver = new Resolver();

resolver.define('getText', (req) => {
    console.log(req);

    return 'Hello, world!';
});

resolver.define('authenticate',async ({payload}) =>{
    //console.log(payload.userid)
    //console.log(payload.password)

    const body = {
        username : payload.userid,
        password : payload.password
    }

    console.log(body)

    const url = 'https://jira-dev.tools.sap/rest/auth/1/session'

    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
    }

    const response = await fetch(url, options);

    console.log(response)

    if(response.status !== 200)
        return 'Authentication Failed'
    
    return 'Authentication Successful'
})

resolver.define('getissue',async ({payload}) =>{
    console.log(payload.issue)
    //console.log(payload.userid)
    //console.log(payload.password)

    const url = `https://jira-dev.tools.sap/rest/api/2/issue/${payload.issue}/comment`

    console.log(btoa(String(payload.userid) + ":" + String(payload.password)))
    console.log(`Basic ${btoa(String(payload.userid) + ":" + String(payload.password))}`) //STUyODk3NDpKaWJpbWF4QDI4MTEyMDAy

    const options = {
        headers:{
            Authorization : `Basic ${btoa(String(payload.userid) + ":" + String(payload.password))}`,
        },
        
        method : 'GET'
    }

    const response = await fetch(url,options)

    console.log(response)

    if(response.status !== 200)
        return -1
    
    const data = await response.json()
    console.log(data)
    return data.total
})

export const handler = resolver.getDefinitions();

