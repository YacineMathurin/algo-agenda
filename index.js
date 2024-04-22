let meetings = [
  {
    start: 1,
    end: 3,
  },
  {
    start: 9,
    end: 10,
  },
  {
    start: 2,
    end: 6,
  },
  {
    start: 6,
    end: 8,
  },
  {},
];

let spreadOpMeetings = [...meetings];
let sortedMeetings = meetings.toSorted((a, b) => a.start - b.start);

console.log("Meetings", meetings);
// console.log("spreadOpMeetings", spreadOpMeetings);
console.log("sortedMeetings", sortedMeetings);

let res = [];

res = sortedMeetings.splice(0, 1);
let resultIndex = 0;

sortedMeetings = sortedMeetings.filter(
  (item) => item.start !== undefined && item.end !== undefined
);

console.log("Pre-result first element", res);
console.log("Filtered Meetings", sortedMeetings);

const isFreeTime = (index) => {
  if (sortedMeetings[index]["start"] > res[res.length - 1]["end"]) {
    return true;
  }
  return false;
};

const busyTimes = () => {
  // Don't execute on last obj of the array
  for (let index = 0; index < sortedMeetings.length; index++) {
    if (isFreeTime(index)) {
      res.push(sortedMeetings[index]);
      resultIndex = res.length + 1;
    } else {
      // Combine meetings time
      res[resultIndex] = {
        start: res[res.length - 1]["start"],
        end: sortedMeetings[index]["end"],
      };
    }
  }
};

busyTimes();
console.log("Result", res);

///////

while (isTimeBetween) {}

if (res[res.length - 1]["collapsed"]) {
  // Collapse with the lowest meeting interval
  if (isCollapsingWithLowestInterval(index)) {
    res[res.length - 2]["width"] = fullwidth / 3;
    res[res.length - 1]["width"] = fullwidth / 3;
    res.push({
      width: fullwidth / 3,
      xOrigin: fullwidth / 3,
      collapsed: true,
      longerMeetingEndTime: getLongerMeetingEndTime(index),
      lowestMeetingEndTime: getLowestMeetingEndTime(index),
    });
  }
  // Collapse with the biggest meeting interval
  if (isCollapsingWithLongerInterval(index)) {
  }
  // Doesn't collapse
}

if (isTimeBetween(index)) {
  res.push(sortedMeetings[index]);
  continue;
}

// Combine meetings time
// Split the width with the collapser
res[res.length - 1]["width"] = fullwidth / 2;
res.push({
  width: fullwidth / 2,
  xOrigin: fullwidth / 2,
  collapsed: true,
  longerMeetingEndTime: getLongerMeetingEndTime(index),
  lowestMeetingEndTime: getLowestMeetingEndTime(index),
});

res = [
  {
    start: 0,
    endTime: 0,
    duration: 0, // Infer the height based on the duration via a function
    xOrigin: 0,
    width: 0,
    collapsed: false,
    longerMeetingEndTime: 0,
  },
];

const input = [
  {
    id: "1",
    start: 7,
    end: 8,
    duration: 60,
  },
  {
    id: "2",
    start: 9,
    end: 12,
    duration: 60,
  },
  {
    id: "3",
    start: 9,
    end: 10,
    duration: 60,
  },
  {
    id: "3",
    start: 11,
    end: 12,
    duration: 60,
  },
  {
    id: "3",
    start: 13,
    end: 14,
    duration: 60,
  },
  {
    id: "3",
    start: 14,
    end: 18,
    duration: 60,
  },
  {
    id: "3",
    start: 16,
    end: 18,
    duration: 60,
  },
];