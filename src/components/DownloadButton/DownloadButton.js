import "../../index.scss";
import { useScreenshot, createFileName } from "use-react-screenshot";

function DownloadButton({ refElement }) {
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { extension = "jpg" } = {}) => {
    const date = new Date().toLocaleString();
    const name = (date + "CalculadoraDolar").replace(" ", "__");
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () =>
    takeScreenShot(refElement.current).then(download);

  return (
    <button className="btn" onClick={downloadScreenshot}>
      Guardar como imagen
    </button>
  );
}

export default DownloadButton;
