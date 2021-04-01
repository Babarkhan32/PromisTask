const { Value } = require("baconjs");
const { callApi } = require("../../../Ghelpers/callApi");


exports.getTitleCall = async (req, res) => {
    try {
        if (req.query.address) {
            let finalArray = [];
            let isArr = Array.isArray(req.query && req.query.address);
            let urlArray = null;
            let result = null
            isArr ? urlArray = req.query.address : urlArray = [req.query.address]

            for (let i = 0; i < urlArray.length; i++) {
                try {
                    result = await callApi("https://" + urlArray[i])
                        ;
                    if (result)
                        finalArray.push({ link: "https://" + urlArray[i], valid: true })
                } catch (e) {
                    finalArray.push({ link: "https://" + urlArray[i], valid: false })
                }
            }
            return res.json({
                success: true,
                data: finalArray
            })


        } else {
            throw new Error("please enter query parameter");
        }

    } catch (e) {
        console.log(e.message);
        res.json({ error: e.message })
    }
}