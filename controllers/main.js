// Custom Modules
const asyncHandler = require('../libs/asyncHandler');
const { trustFactor, } = require('../libs/trust');
const { trustFactorDataPreprocessing, getSteamId, } = require('../libs/apiCalls');

// DB
const { Player_DB, } = require('../config/dbConnection');

// @desc Get the trust factor of a player via profile url
// @route GET /trust
// @access Public
const computeTrust = asyncHandler(async (req, res) => {

    // Get the profile url
    const { profileUrl, } = req.query;

    // Get steam id of the user from the profile url
    const steamId = await getSteamId(profileUrl);

    // Preprocess the data
    const processedData = await trustFactorDataPreprocessing(steamId);

    // Calculate the trust factor
    const trustFactorValue = await trustFactor(processedData);

    // Add trust factor to the processed data
    processedData.trustFactor = trustFactorValue;

    // Save to the database
    const result = await Player_DB
        .findOneAndUpdate({ steamid: steamId, }, processedData, { new: true, upsert: true, })
        .lean();


    res.status(200).json(result);

});

// @desc Get the trust factor of a player via steam id
// @route GET /trust/:id
// @access Public
const computeTrustId = asyncHandler(async (req, res) => {

    // Get the profile url
    const { steamId, } = req.params;

    // Preprocess the data
    const processedData = await trustFactorDataPreprocessing(steamId);

    // Calculate the trust factor
    const trustFactorValue = await trustFactor(processedData);

    // Add trust factor to the processed data
    processedData.trustFactor = trustFactorValue;

    // Save to the database
    const result = await Player_DB
        .findOneAndUpdate({ steamid: steamId, }, processedData, { new: true, upsert: true, })
        .lean();


    res.status(200).json(result);

});

// @desc Get the trust factor of a player via steam id
// @route GET /trust/bulk
// @access Public
const computTrustBulk = asyncHandler(async (req, res) => {

    // Get the profile url
    const { profileUrl, } = req.query;


});


module.exports = { computeTrust, computeTrustId, };


const recursiveAnalysis = require('../libs/recursiveAnalysis');

recursiveAnalysis('https://steamcommunity.com/id/avivlo0612/').catch(err => console.log(err));