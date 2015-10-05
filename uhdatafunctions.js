/**
 * Analytics for UH Data sets.
 * Created by Sam Chun on 10/4/15.
 */

/* globals _, uhdata */
/* exported listCampusDegrees, doctoralDegree, listYearDegrees */
/* exported testData, percentageHawaiian, totalDegreesByYear, listCampuses */

var testData = uhdata.slice(0, 2).concat(_.find(uhdata, isHawaiian));

/**
 * A helper function that returns the added degrees from the inputted data
 * @param memo
 * @param num
 * @returns {*}
 */
function addDegrees(memo, num){
  if(isNaN(num["AWARDS"])){
    throw new Error("Non integer value");
  }
  return memo + num["AWARDS"];
}

/**
 * Returns true if the passed record has an AWARDS field
 * @param record The record
 * @returns {boolean} TRUE if AWARDS field present
 */
function hasAwards(record){
  return record.hasOwnProperty("AWARDS");
}

/**
 * totalDegrees returns the total degrees from the inputted data
 * @param data
 * @returns {*}
 */
function totalDegrees(data){
  if(!_.every(data, hasAwards)){
    throw new Error("No AWARDS field.");
  }
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

/**
 * listCampuses returns the unique campuses from the data set
 * @param data The data inputted
 * @returns {*}
 */
function listCampuses(data){
  return _.uniq(_.pluck(data, "CAMPUS"));
}

/**
 * A helper function that returns the data grouped by campus
 * @param data The inputted data
 * @returns {*}
 */
function groupByCampus(data){
  return _.groupBy(data, "CAMPUS");
}

/**
 * listCampusDegres returns the amount of degrees from each campus
 * @param data The inputted data
 * @returns {*}
 */
function listCampusDegrees(data){
  return _.mapObject(groupByCampus(data),
      function(val){
        return _.reduce(val, addDegrees, 0);
      });
}

/**
 * A helper function that returns the data grouped by year.
 * @param data The inputted data
 * @returns {*}
 */
function groupByYear(data){
  return _.groupBy(data, "FISCAL_YEAR");
}

/**
 * listYearDegrees returns the maximum degrees based on year
 * @param data The inputted data
 * @returns {number}
 */
function listYearDegrees(data){
  return _.max(_.mapObject(groupByYear(data), function(val){
    return _.reduce(val, addDegrees, 0);
  }));

}

/**
 * doctoralDegree returns the amount of doctoral degrees from the data set
 * @param data The inputted data
 * @returns {*}
 */
function doctoralDegree(data){
  return _.uniq(_.pluck(_.filter(data, function(num) {
    return num["OUTCOME"] === "Doctoral Degrees";
  }), "CIP_DESC"));
}
