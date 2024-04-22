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

function getHeight(index) {
  return (sortedMeetings[index]["duration"] * echelle) / 60;
}

function formatInput(input) {
  const dateString = "01 Jan 2024";
  const dateToMilliseconds = (date) => {
    return Date.parse(`${dateString} ${date} GMT`);
  };

  input = input.map((el, idx) => ({
    id: el.id,
    start: dateToMilliseconds(el.start),
    end: dateToMilliseconds(el.start) + el.duration * 60 * 1000,
    height: getHeight(idx),
  }));
  console.log("Input", input);
  return input;
}

formatInput(input);
