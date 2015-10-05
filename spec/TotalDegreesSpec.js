/* globals _, uhdata, totalDegrees, isHawaiian */
describe("TotalDegrees", function() {
  var testData = uhdata.slice(0, 2).concat(_.find(uhdata, isHawaiian));

  it("should compute the total number of awards for specified sample data", function () {
    expect(totalDegrees(testData)).toEqual(403);
  });

  var noAwardsField = testData.concat({foo:"bar"});
  it("should throw an error when a record is missing the AWARDS field", function(){
    expect(function(){totalDegrees(noAwardsField);}).toThrowError("No AWARDS field.");
  });

  var noNumericAwards = testData.concat({"AWARDS":"bar"});
  it("should throw an error when the AWARDS field contains a non integer value", function(){
    expect(function(){totalDegrees(noNumericAwards);}).toThrowError("Non integer value");
  });
});