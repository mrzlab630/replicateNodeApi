/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-03-22
 * Time: 10:31
 * About:
 *
 */

import fetch from 'node-fetch'


class ReplicateNodeApi {

    private apiUrl:string
    private token:string

    private requestDelay:number


    constructor(token:string){
        this.requestDelay = 30000
        this.token = token ? 'Token '+token : token
        this.apiUrl = 'https://api.replicate.com/v1/predictions'
    }



    public async getOutput(id:string){
        try {
            if(!id){
                throw new Error('id is empty')
            }

            const fetchPrediction = await fetch(
                this.apiUrl+'/'+id,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:this.token
                    },
                }
            )
            const result = await fetchPrediction.json()
            return  {result}

        }catch (e) {
            return {error:(e as Error).message}
        }

    }
    public async createPrediction(version:string,input:{}){
        try {
            if(!version){
                throw new Error('model version is empty')
            }
            if(!this.token){
                throw new Error('token is empty')
            }


            const fetchPrediction = await fetch(
                this.apiUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:this.token
                    },
                    body: JSON.stringify({
                        version,
                        input
                    })
                }
            )

            const result =  await fetchPrediction.json()

            return {result}

        }catch (e) {
            return {error:(e as Error).message}
        }
    }

    public async getPrediction(id:string): Promise<{error?:string,result?:any}>{
        try {
            const {result,error} = await this.getOutput(id)

            if(error || !result){
                throw new Error(error || 'unknown error')
            }
            const {status} = result

            switch (status) {
                case 'succeeded':
                case 'error':
                    return {result}

                default:
                    await new Promise(resolve => setTimeout(resolve, this.requestDelay))
                    return this.getPrediction(id)
            }

        }catch (e) {
            return {error: (e as Error)?.message}
        }
    }

}


export default ReplicateNodeApi