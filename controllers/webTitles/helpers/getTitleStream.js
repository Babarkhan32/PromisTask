const Bacon = require('baconjs');
const { callApi } = require('../../../Ghelpers/callApi');
exports.getTitleStream = (req, res) => {

    let finalArray = [];
    if (req.query.address) {
        let isArr = Array.isArray(req.query && req.query.address);
        let urlArray = null;
        isArr ? urlArray = req.query.address : urlArray = [req.query.address]

        const getResults = async (value) => {

            let url = Bacon.fromPromise(callApi("https://" + value).catch((e) => {

                finalArray.push({ link: e.config.url, valid: false })
                if (finalArray.length == urlArray.length) {
                    return res.json({
                        success: true,
                        data: finalArray
                    })
                }

            }));

            url.dispatcher._subscribe(e => {
                if (e && e.value && e.value.status) {

                    finalArray.push({ link: e && e.value && e.value.config && e.value.config.url, valid: true })

                    if (finalArray.length == urlArray.length) {
                        return res.json({
                            success: true,
                            data: finalArray
                        })
                    }
                }
            });

        }

        urlArray.flatMap(getResults)


    }
}