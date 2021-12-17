import "../../index.scss";
import { useScreenshot, createFileName } from "use-react-screenshot";

function DownloadButton({ refElement }) {
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { extension = "jpg" } = {}) => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newdate = year + "-" + month + "-" + day;
    const name = (newdate + "DolarCalculator").replace(" ", "__");
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
