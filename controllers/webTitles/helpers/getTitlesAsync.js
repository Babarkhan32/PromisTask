var async = require("async");
const { callApi } = require("../../../Ghelpers/callApi")
const { validURL } = require("./validateUrl");
exports.getTitlAsync = (req, res) => {
    try {
        if (req.query.address) {
            let isArr = Array.isArray(req.query && req.query.address);
            let urlArray = null;
            isArr ? urlArray = req.query.address : urlArray = [req.query.address];

            async.mapLimit(urlArray, 5, async function (value) {
                let isValid = validURL(value);
                if (isValid) {
                    try {
                        let result = await callApi("https://" + value);
                        if (result) {
                            return { link: value, valid: true }
                        }
                    }
                    catch (e) {
                        if (e && e.config && e.config.url) {
                            return { link: e.config.url, valid: false }
                        }
                    }
                } else {
                    return { link: value, valid: false }
                }
            }, (err, results) => {

                if (err) console.log(err)
                return res.json({
                    success: true,
                    data: results
                })
            })
        }


    } catch (e) {
        console.log(e);
    }

}