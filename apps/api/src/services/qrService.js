import QRCode from "qrcode";

export async function generateQRCode(url, options = {}) {
  const {
    format = "png",
    size = 300,
    color = "#000000",
    bg = "#ffffff",
  } = options;

  const qrOptions = {
    width: size,
    margin: 2,
    color: {
      dark: color,
      light: bg,
    },
  };

  if (format === "svg") {
    return QRCode.toString(url, { ...qrOptions, type: "svg" });
  }

  return QRCode.toDataURL(url, qrOptions);
}
