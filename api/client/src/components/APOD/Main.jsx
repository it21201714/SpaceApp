export default function Main(props) {
  const { data } = props;

  // Check if a video link is provided in the data
  const isVideo = data && data.media_type === "video";

  return (
    <div className="imgContainer">
      {isVideo ? (
        // If it's a video, render an iframe for embedding YouTube video
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
        // If it's not a video, render an image
        <img src={data.hdurl} alt={data.title} className="bgImage" />
      )}
    </div>
  );
}
