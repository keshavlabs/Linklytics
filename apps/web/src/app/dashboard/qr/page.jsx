import QRGenerator from "@/components/qr/QRGenerator";

export default function QRPage() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">QR Codes</h1>
        <p className="text-gray-400 text-sm mt-1">
          Generate and download QR codes for any URL
        </p>
      </div>
      <QRGenerator />
    </div>
  );
}
