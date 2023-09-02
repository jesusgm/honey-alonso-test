import PropTypes from "prop-types";

import "./style.css";

const propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  answer: PropTypes.string,
  setAnswer: PropTypes.func.isRequired,
};

function Question({ id, title, answer, setAnswer }) {
  return (
    <div className={`question ${answer !== null ? "answered" : ""}`}>
      <div className="question__id">{id}</div>
      <div className="question__content">
        <div className="question__text">{title}</div>
      </div>
      <div className="question__options">
        <button
          className={`${answer === "+" ? "selected" : ""}`}
          onClick={() => setAnswer("+")}
        >
          +
        </button>
        <button
          className={`${answer === "-" ? "selected" : ""}`}
          onClick={() => setAnswer("-")}
        >
          -
        </button>
      </div>
    </div>
  );
}

Question.propTypes = propTypes;

export default Question;
