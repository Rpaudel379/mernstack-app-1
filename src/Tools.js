const Tools = (props) => {
  const title = props.title;
  const bg = props.bg;

  document.title = title;
  document.body.style.background = bg;
};

export default Tools;
