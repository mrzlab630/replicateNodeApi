/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-03-23
 * Time: 08:57
 * About:
 *
 */

import ReplicateNodeApi from './ReplicateNodeApi'


const run = async function (){

    try {

        const apiKey = '123456'
        //https://replicate.com/prompthero/openjourney
        const version = '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb'
        const input = {
            prompt: "mdjrny-v4 style a highly detailed matte painting of a man on a hill watching a rocket launch in the distance by studio ghibli, makoto shinkai, by artgerm, by wlop, by greg rutkowski, volumetric lighting, octane render, 4 k resolution, trending on artstation, masterpiece",
            num_outputs:1,
            width:512,
            height:512,
            num_inference_steps: 50,
            guidance_scale: 6
        }

        const repAgent = new ReplicateNodeApi(apiKey)

        //send a request to create an image
        const {result:predict, error:errPredict} = await repAgent.createPrediction(version,input)

        if(errPredict){
            throw new Error(errPredict)
        }

        const {id,detail} = predict

        if(detail){
            throw new Error(detail)
        }

        //get the image
        const {error, result} = await repAgent.getPrediction(id)

        if(error){
            throw new Error(error)
        }

        console.log(result)

    }catch (e) {
        console.log(e.message)
    }
}


