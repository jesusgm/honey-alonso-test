import "./style.css";

function Question({ id, title, answer, setAnswer }) {
  return (
    <div className="question">
      <div className="question__text">{title}</div>
      <div className="question__options">
        <button onClick={() => setAnswer("+")}> + </button>
        <button onClick={() => setAnswer("-")}> - </button>
      </div>
    </div>
  );
}

export default Question;
