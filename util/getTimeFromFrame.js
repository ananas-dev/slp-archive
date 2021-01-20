const getTimeFromFrame = (lastFrame, fps) => {
  let minutes = Math.floor(lastFrame / fps / 60);
  let seconds = Math.floor(lastFrame / fps - minutes * 60);
  return minutes + ":" + seconds;
};

export default getTimeFromFrame;
