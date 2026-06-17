import { useState } from "react";

function expandDescription(id, isExpanded) {
  try {
    let expandIcon = document.getElementById(`expand-img-${id}`);
    expandIcon.src = `./src/assets/${isExpanded ? "down" : "right"}.svg`;

    let container = document.getElementById(
      `expense-description-container-${id}`
    );
    container.style.visibility = isExpanded ? "visible" : "hidden";
    container.style.display = isExpanded ? "block" : "none";
    return !isExpanded;
  } catch (error) {
    console.error(error);
    return isExpanded;
  }
}

function Expense(props) {
  const [description, setDescription] = useState(false);

  return (
    <>
      <button
        className="expense-expand btn-style-default"
        onClick={() => setDescription(expandDescription(props.id, description))}
      >
        <img
          src="./src/assets/right.svg"
          alt="expand"
          id={`expand-img-${props.id}`}
        />
      </button>
      <div>
        <span className="expense-name">{props.title}</span>
        <span className="expense-amount">{props.amount}</span>
        <span className="expense-date">{props.date}</span>
      </div>
      <button className="expense-delete btn-style-default">
        <img src="./src/assets/delete.svg" alt="delete" />
      </button>
      <div id={`expense-description-container-${props.id}`}>
        <hr />
        <p className="expense-description">{props.description}</p>
      </div>
    </>
  );
}

export default Expense;
