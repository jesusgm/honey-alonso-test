import { useState } from "react";
import questionsData from "./questions.json";
// import questionsData from "./questions-dev.json";
import categoriesData from "./categories.json";

import Question from "./components/question";
import RadarChart from "./components/chart";

import "./App.css";

const PAGES = {
  init: "Inicio",
  questions: "Questions",
  results: "Resultados",
};

function App() {
  const [page, setPage] = useState(PAGES.results);
  const [questions, setQuestions] = useState(
    questionsData.map((question) => {
      return {
        ...question,
        answer: null,
      };
    })
  );

  const [categories, setCategories] = useState(
    categoriesData.map((category) => {
      return {
        ...category,
        value: 0,
      };
    })
  );

  const allAnswered = questions.every((question) => question.answer !== null);

  const handleAnswer = (id, newAnswer) => {
    if (newAnswer === "+") {
      const currentQuestion = questions.find((question) => question.id === id);
      setCategories(
        categories.map((category) => {
          if (category.id === currentQuestion.categoryId) {
            return {
              ...category,
              value: category.value + 1,
            };
          }
          return category;
        })
      );
    }
    setQuestions(
      questions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            answer: question.answer === newAnswer ? null : newAnswer,
          };
        }
        return question;
      })
    );
  };

  return (
    <>
      <h1>Cuestionario HONEY-ALONSO de ESTILOS DE APRENDIZAJE</h1>
      <div className="breadcrums">
        <span onClick={() => setPage(PAGES.init)}>{PAGES.init}</span>
        {page === PAGES.questions && <span>&gt; {PAGES.questions}</span>}
        {page === PAGES.results && (
          <>
            <span onClick={() => setPage(PAGES.questions)}>
              &gt; {PAGES.questions}
            </span>
            <span>&gt; {PAGES.results}</span>
          </>
        )}
      </div>
      {page === PAGES.init && (
        <div className="init-page">
          <p>Instrucciones para responder al cuestionario:</p>
          <ul>
            <li>
              Este cuestionario ha sido diseñado para identificar tu estilo
              preferido de aprender. No es un test de inteligencia, ni de
              personalidad.
            </li>
            <li>No hay límite de tiempo para contestar el cuestionario.</li>
            <li>
              No hay respuestas correctas o erróneas. Será útil en la medida que
              seas sincero/a en tus respuestas.
            </li>
            <li>
              Si estás más de acuerdo que en desacuerdo con la sentencia pon un
              signo más (+), Si, por el contrario, estás más en desacuerdo que
              de acuerdo, pon un signo menos (-). Por favor contesta a todas las
              sentencias.
            </li>
          </ul>
          <button onClick={() => setPage(PAGES.questions)}>Comenzar</button>
        </div>
      )}
      {page === PAGES.questions && (
        <div className="questions-page">
          <div className="question-breadcrums">
            {questions.map(({ id, answer }) => {
              return (
                <div
                  key={id}
                  className={`question-breadcrum ${
                    answer === null ? "pending" : "answered"
                  }`}
                >
                  <span>{id}</span>
                </div>
              );
            })}
          </div>
          {questions.map(({ id, title, answer }) => {
            return (
              <Question
                key={id}
                id={id}
                title={title}
                answer={answer}
                setAnswer={(newAnswer) => handleAnswer(id, newAnswer)}
              />
            );
          })}
          <button
            disabled={!allAnswered}
            onClick={() => setPage(PAGES.results)}
          >
            Ver resultados
          </button>
        </div>
      )}

      {page === PAGES.results && (
        <div className="results-page">
          <RadarChart categories={categories} />
        </div>
      )}
    </>
  );
}

export default App;
