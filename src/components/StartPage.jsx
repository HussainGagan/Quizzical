export default function StartPage(props) {
  return (
    <div className="quiz-text-body">
      <h1 className="quiz-heading">Quizzical</h1>
      <p className="quiz-desc">Expand your knowledge with every question</p>
      <button onClick={props.handleClick} className="btn-start-quiz">
        Start quiz
      </button>
    </div>
  );
}
