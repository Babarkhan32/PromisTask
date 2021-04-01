const { getTitles } = require("../webTitles/helpers/getTitles")
const { getTitlAsync } = require("../webTitles/helpers/getTitlesAsync")
const { getTitleStream } = require("../webTitles/helpers/getTitleStream")
const {getTitleCall}=require("../webTitles/helpers/getTitleCall")
module.exports = {
    getTitles,
    getTitlAsync,
    getTitleStream,
    getTitleCall
}