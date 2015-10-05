/**
 * Analytics for UH Data sets.
 * Created by Sam Chun on 10/4/15.
 */

/* globals _, uhdata */
/* exported uhdata, percentageHawaiian, totalDegreesByYear */

/**
 * A helper function that returns the added degrees from the inputted data
 * @param memo
 * @param num
 * @returns {*}
 */
function addDegrees(memo, num){
  return memo + num["AWARDS"];
}

/**
 * totalDegrees returns the total degrees from the inputted data
 * @param data
 * @returns {*}
 */
function totalDegrees(data){
  return _.reduce(data, addDegrees, 0);
}

/**
 * A helper function for hawaiianLegacy that checks if data matches "HAWAIIAN"
 * @param data The inputted data
 * @returns {boolean}
 */
function isHawaiian(data){
  return data["HAWAIIAN_LEGACY"] === "HAWAIIAN";
}

/**
 * A helper function for totalHawaiianLegacy that returns the filtered data so it only shows Hawaiian degrees
 * @param data The data inputted
 * @returns {Array}
 */
function hawaiianLegacy(data){
  return _.filter(data, isHawaiian);
}

/**
 * A helper function for percentageHawaiian that returns the total Hawaiian degrees from the data
 * @param data The data inputted
 * @returns {*}
 */
function totalHawaiianLegacy(data){
  return _.reduce(hawaiianLegacy(data), addDegrees, 0);
}

/**
 * percentageHawaiian returns the percentage of Hawaiian graduates in the overall pool of data
 * @param data The data inputted
 * @returns {number}
 */
function percentageHawaiian(data){
  return totalHawaiianLegacy(data) / totalDegrees(data) * 100;
}

/**
 * A helper function for totalDegreesByYear that parses that data and returns only the data for the specified year
 * @param data The data inputted
 * @param year The year inputted
 * @returns {Array}
 */
function dataForYear(data, year){
  return _.filter(data, function(record){return record["FISCAL_YEAR"] === year;});
}

/**
 * totalDegreesByYear returns the total degrees based on the year inputted.
 * @param data The data inputted
 * @param year The year inputted
 * @returns {*}
 */
function totalDegreesByYear(data, year){
  return _.reduce(dataForYear(data, year), addDegrees, 0);
}

