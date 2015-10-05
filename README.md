# Overview

Provides 7 functions for computer analytics over the [Hawaii Open Dataset for Five Years of UH Degree Data](http://philipmjohnson.github.io/ics314f15/morea/underscore/experience-underscore.html).

# Installation

Provide the following scripts in your html file:
```
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/underscore-min.js"></script>
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/uhdata.js"></script>
<script src="uhdatafunctions.js"></script>
```

# Usage

Here are example calls to the analytic functions
```
<script>
  console.log(totalDegrees(uhdata));
  console.log(hawaiianLegacy(uhdata));
  console.log(totalHawaiianLegacy(uhdata));
  console.log(percentageHawaiian(uhdata));
  console.log(dataForYear(uhdata, 2011));
  console.log(totalDegreesByYear(uhdata, 2010));
  console.log(doctoralDegree(uhdata));
</script>
```

Consult the uhdatafunctions.js file for more details on these functions.

# Credits

Uses the [Underscore](http://underscorejs.org) library.
