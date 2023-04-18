export default function Checkbox(props) {
  return (
    <div className="flex checkbox-container">
      <input type="checkbox" className="checkbox" />
      <p className="instruction">
        {props.number}. {props.step}
      </p>
    </div>
  );
}
