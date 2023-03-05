import React from "react";

export default function Item(props) {
  return (
    <div className="quiz-item">
      <h2
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: props.question }}
      ></h2>
      <div className="quiz-options">
        {props.options.map((op, i) => {
          return (
            <label
              key={i}
              className={`option-label 
              ${props.userSelectedAns === op && "label-selected"}
              ${props.isOver && "over"}
              ${props.isOver && props.correctAnswer === op && "correct-ans"}
              ${
                props.isOver &&
                props.userSelectedAns === op &&
                props.userSelectedAns !== props.correctAnswer &&
                "incorrect-ans"
              }
              `}
            >
              <span dangerouslySetInnerHTML={{ __html: op }}></span>
              <input
                type="radio"
                name={`question-${props.id}`}
                value={op}
                checked={props.userSelectedAns === op}
                onChange={(event) => props.handleChange(event, props.id)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
