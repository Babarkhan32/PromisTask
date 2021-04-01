const { callApi } = require("../../../Ghelpers/callApi")

exports.getTitles = async (req, res) => {
    try {
        if (req.query.address) {
            let promises = [],
                finalArray = [];
            let isArr = Array.isArray(req.query && req.query.address);
            let urlArray = null;
            isArr ? urlArray = req.query.address : urlArray = [req.query.address]
            for (let i = 0; i < urlArray.length; i++) {
                
                let promise = callApi("https://" + urlArray[i]);
                promises.push(promise);
            }
            Promise.allSettled(promises).then((results) => {
               
                for (let i = 0; i < results.length; i++) {
                    finalArray.push({ value: urlArray[i], valid: results[i].status == 'fulfilled' ? true : false })

                }
              
                return res.json({
                    success: true,
                    data: finalArray
                })
            });




        } else {
            throw new Error("please enter query parameter");
        }

    } catch (e) {
        console.log(e.message);
        res.json({ error: e.message })
    }
}