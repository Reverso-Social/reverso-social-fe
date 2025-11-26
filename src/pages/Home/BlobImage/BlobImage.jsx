import "./BlobImage.scss";

export default function BlobImage({ src, alt }) {
  return (
    <div className="blob-frame" aria-hidden={alt ? "false" : "true"}>
      <div className="blob-frame__inner">
        <img src={src} alt={alt} className="blob-frame__image" />
      </div>
    </div>
  );
}
