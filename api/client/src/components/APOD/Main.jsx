export default function Main(props) {
  const { data } = props;

  const isVideo = data && data.media_type === "video";

  return (
    <div className="imgContainer">
      {isVideo ? (
        <iframe
          className="w-full h-full"
          title="YouTube Video"
          width="100%"
          height="auto"
          src={data.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
       
        <img src={data.hdurl} alt={data.title} className="bgImage" />
      )}
    </div>
  );
}
