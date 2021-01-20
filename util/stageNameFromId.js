import Stages from "../public/static/data/stages";

const stageNameFromId = (id) => {
  for (const i of Stages) {
    if (i.id === String(id)) return i.name;
  }
};

export default stageNameFromId;
