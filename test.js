/**
 * Test
 */
let input = [
  {
    id: 1,
    start: "17:00",
    duration: 60,
  },
  {
    id: 2,
    start: "17:00",
    duration: 120,
  },
];

const containerHeight = 240;
const echelle = containerHeight / 24;
const fullwidth = 240;
let collapsingWithSmallerInterval = true;
let collapsingWithBiggerInterval = false;
let lastElementCollapsed = false;
// We need first exec to have isCollapsingWithLowestInterval to be true cause we by default start from left to right
let lowestMeetingEndTime = Number.MAX_SAFE_INTEGER;
let longerMeetingEndTime = -1;
let collapsingWithSmallerIntervalCount = 0;
const dateString = "01 Jan 2024";

const meetings = [...formatInput(input)];
const sortedMeetings = meetings.toSorted((a, b) => a.start - b.start);
const res = sortedMeetings.splice(0, 1);

function formatInput(input) {
  const dateString = "01 Jan 2024";
  const dateToMilliseconds = (date) => {
    return Date.parse(`${dateString} ${date} GMT`);
  };

  input = input.map((el) => ({
    id: el.id,
    start: dateToMilliseconds(el.start),
    end: dateToMilliseconds(el.start) + el.duration * 60 * 1000,
    height: (el.duration * echelle) / 60,
  }));
  console.log("Input", input);
  return input;
}

function dateToMilliseconds(date) {
  const startTime = Date.parse(`${dateString} ${date} GMT`);
}

function getLongerMeetingEndTime(index) {
  return Math.max(sortedMeetings[index]["end"], res[res.length - 1]["end"]);
}

function getLowestMeetingEndTime(index) {
  return Math.min(sortedMeetings[index]["end"], res[res.length - 1]["end"]);
}

function resetDefault() {
  lowestMeetingEndTime = Number.MAX_SAFE_INTEGER;
  longerMeetingEndTime = -1;
}

function isTimeBetween(index) {
  return sortedMeetings[index]["start"] > res[res.length - 1]["end"];
}

const isCollapsingWithLowestInterval = (index) => {
  return sortedMeetings[index]["start"] <= lowestMeetingEndTime;
};

const isCollapsingWithLongerInterval = (index) => {
  return sortedMeetings[index]["start"] <= longerMeetingEndTime;
};

const handleNotCollapsing = (index) => {
  console.log("handleNotCollapsing");

  resetDefault();
  collapsingWithSmallerIntervalCount = 0;

  res.push({
    id: sortedMeetings[index]["id"],
    start: sortedMeetings[index]["start"],
    end: sortedMeetings[index]["end"],
    xOrigin: 0,
    width: fullwidth,
    height: sortedMeetings[index]["height"],
  });
};

const handleCollapsingWithSmallerInterval = (index) => {
  collapsingWithSmallerIntervalCount += 1;
  console.log("handleCollapsingWithSmallerInterval");

  lastElementCollapsed = true;
  lowestMeetingEndTime = getLowestMeetingEndTime(index);
  longerMeetingEndTime = getLongerMeetingEndTime(index);

  res.push({
    id: sortedMeetings[index]["id"],
    start: sortedMeetings[index]["start"],
    end: sortedMeetings[index]["end"],
    xOrigin: 0,
    width: fullwidth,
    height: sortedMeetings[index]["height"],
  });

  let lastElementIndex = res.length - 1;
  let countBack = 0;
  for (
    let idx = lastElementIndex;
    idx >= lastElementIndex - collapsingWithSmallerIntervalCount;
    idx--
  ) {
    res[idx]["width"] = fullwidth / (collapsingWithSmallerIntervalCount + 1);
    res[idx]["xOrigin"] =
      ((collapsingWithSmallerIntervalCount - countBack) * fullwidth) /
      (collapsingWithSmallerIntervalCount + 1);
    countBack += 1;
  }
};

const handleCollapsingWithBiggerInterval = (index) => {
  console.log("handleCollapsingWithBiggerInterval");

  lastElementCollapsed = true;
  collapsingWithSmallerIntervalCount = 0;
  lowestMeetingEndTime = getLowestMeetingEndTime(index);
  longerMeetingEndTime = getLongerMeetingEndTime(index);

  res.push({
    id: sortedMeetings[index]["id"],
    start: sortedMeetings[index]["start"],
    end: sortedMeetings[index]["end"],
    xOrigin: 0,
    height: sortedMeetings[index]["height"],
    width:
      (fullwidth * collapsingWithSmallerIntervalCount) /
      (collapsingWithSmallerIntervalCount + 1),
  });
};

const checker = (index) => {
  console.log(
    index,
    lowestMeetingEndTime,
    isTimeBetween(index),
    isCollapsingWithLowestInterval(index),
    !isTimeBetween(index) && isCollapsingWithLowestInterval(index)
  );
  if (isTimeBetween(index) && !isCollapsingWithLongerInterval(index)) {
    return "not_collapsing";
  }

  if (isCollapsingWithLowestInterval(index)) {
    return "collapsing_with_smaller_interval";
  }

  return "collapsing_with_bigger_interval";
};

const DrawTimeLine = () => {
  for (let index = 0; index < sortedMeetings.length; index++) {
    // For each it, check the 3 possibilities
    switch (checker(index)) {
      case "not_collapsing":
        handleNotCollapsing(index);
        break;

      case "collapsing_with_bigger_interval":
        handleCollapsingWithBiggerInterval(index);
        break;

      case "collapsing_with_smaller_interval":
        handleCollapsingWithSmallerInterval(index);
        break;
    }
  }
};

console.log(input);
DrawTimeLine();
console.log(res);
