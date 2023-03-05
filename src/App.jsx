import React from "react";
import StartPage from "./components/StartPage";
import QuizItem from "./components/QuizItem";
import { ProgressBar } from "react-loader-spinner";
import { nanoid } from "nanoid";

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [quizData, setQuizData] = React.useState([]);
  const [scoreMsg, setScoreMsg] = React.useState("");
  const [isOver, setIsOver] = React.useState(false);
  const [playAgain, setPlayAgain] = React.useState(0);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setQuizData(() => {
          return data.results.map((item) => ({
            id: nanoid(),
            question: item.question,
            correctAnswer: item.correct_answer,
            options: shuffleArray([
              item.correct_answer,
              ...item.incorrect_answers,
            ]),
            userSelectedAns: "",
          }));
        });
      });
  }, [playAgain]);

  function checkAllQuestionCompleted() {
    let hasCompleted = true;
    for (const item of quizData) {
      if (item.userSelectedAns === "") {
        hasCompleted = false;
        break;
      }
    }
    return hasCompleted;
  }

  function checkAns() {
    if (isOver) {
      setQuizData([]);
      setPlayAgain((oldVal) => oldVal + 1);
      setScoreMsg("");
      setIsOver(false);
    } else {
      if (!checkAllQuestionCompleted()) {
        setScoreMsg("Please Complete all the question");
      } else {
        const userScore = quizData.reduce((acc, item) => {
          return item.userSelectedAns === item.correctAnswer ? acc + 1 : acc;
        }, 0);

        setScoreMsg(
          `You scored ${userScore}/${quizData.length} correct answers`
        );
        setIsOver(true);
      }
    }
  }

  function handleChange(event, id) {
    const { value } = event.target;
    setQuizData((oldQuizData) =>
      oldQuizData.map((item) => {
        return item.id === id
          ? {
              ...item,
              userSelectedAns: value,
            }
          : item;
      })
    );
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const quizItems = quizData.map((item, i) => {
    return (
      <QuizItem
        key={item.id}
        id={item.id}
        question={item.question}
        correctAnswer={item.correctAnswer}
        options={item.options}
        handleChange={handleChange}
        userSelectedAns={item.userSelectedAns}
        isOver={isOver}
      />
    );
  });

  return (
    //prettier-ignore
    <main className="main">
      
      <div className="quiz-container">
        {
          startQuiz ? 
          quizData.length === 0 ?
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor = '#36406f'
              barColor = '#4D5B9E'
            /> :
            <section className="quiz-items">
              {quizItems}
              <div className="quiz-info">
                {scoreMsg &&
                <p className="score">{scoreMsg}</p>
                }
                
                <button onClick={checkAns} className="btn-ans">{isOver ? "Play Again" : "Check answers"}</button>
              </div>  
            </section> : 
          <StartPage handleClick={() => setStartQuiz(true)} />
        }
      </div>
    </main>
  );
}
