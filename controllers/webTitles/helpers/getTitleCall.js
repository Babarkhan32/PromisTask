const { Value } = require("baconjs");
const { callApi } = require("../../../Ghelpers/callApi");
const request=require('request')

exports.getTitleCall = async (req, res) => {
    try {
        console.log("Babar");
        if (req.query.address) {
            let finalArray = [];
            let isArr = Array.isArray(req.query && req.query.address);
            let urlArray = null;
            let result = null
            isArr ? urlArray = req.query.address : urlArray = [req.query.address]

          for (let i=0;i<urlArray.length;i++){
              try{
            request("https://"+urlArray[i], function (error, response, body) {
               if(error){
                   
                finalArray.push({link:urlArray[i],valid:false})
                if(finalArray.length==urlArray.length){
                    return res.json({success:true,data:finalArray})
                }
               }
               if(response&&response.statusCode==200){
                   finalArray.push({link:urlArray[i],valid:true})
                   if(finalArray.length==urlArray.length){
                    return res.json({success:true,data:finalArray})
                }
              
               }
              });
            }catch(e){
                console.log(e);
            }
          }

        } else {
            throw new Error("please enter query parameter");
        }

    } catch (e) {
        console.log(e.message);
        res.json({ error: e.message })
    }
}

