const vaccinesType = [
  "Rabia",
  "Parvovirus",
  "Moquillo",
  "Leptospirosis",
  "Otro",
];

export const vaccines = [
  {
    date: "2025-05-01T04:00:00.000Z",
    nextDate: "2026-05-01T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna de refuerzo aplicada",
    status: true,
  },
  {
    date: "2024-03-15T04:00:00.000Z",
    nextDate: "2025-03-15T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna de refuerzo aplicada",
  },
  {
    date: "2023-11-10T04:00:00.000Z",
    nextDate: "2024-11-10T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna anual aplicada",
    status: true,
  },
  {
    date: "2022-08-20T04:00:00.000Z",
    nextDate: "2023-08-20T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna antirrábica aplicada",
  },
  {
    date: "2021-07-05T04:00:00.000Z",
    nextDate: "2022-07-05T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna de parvovirus aplicada",
    status: true,
  },
  {
    date: "2020-12-12T04:00:00.000Z",
    nextDate: "2021-12-12T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna de moquillo aplicada",
  },
  {
    date: "2019-09-18T04:00:00.000Z",
    nextDate: "2020-09-18T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna de leptospirosis aplicada",
    status: true,
  },
  {
    date: "2018-04-22T04:00:00.000Z",
    nextDate: "2019-04-22T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna anual aplicada",
  },
  {
    date: "2017-01-30T04:00:00.000Z",
    nextDate: "2018-01-30T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna antirrábica aplicada",
    status: true,
  },
  {
    date: "2016-06-14T04:00:00.000Z",
    nextDate: "2017-06-14T04:00:00.000Z",
    type: vaccinesType[Math.floor(Math.random() * vaccinesType.length)],
    description: "Vacuna de refuerzo aplicada",
  },
];
