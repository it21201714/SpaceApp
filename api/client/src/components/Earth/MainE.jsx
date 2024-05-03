export default function MainE(props) {

  const { data } = props;
  return (
    <div className="imgContainer">
      <img src={data.url} alt={data.planet} className="bgImage" />
    </div>
  );
}
