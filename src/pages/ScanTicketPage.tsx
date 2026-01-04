import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ScanTicketPage: React.FC = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const startScan = async () => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    try {
      setIsScanning(true);

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setScannedResult(decodedText);
          scanner.stop();
          setIsScanning(false);
        },
        () => {}
      );
    } catch (err) {
      console.error("Scanner error:", err);
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader>
          <CardTitle>Scan Event Ticket</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            id="qr-reader"
            className="w-full rounded-lg overflow-hidden"
          />

          {scannedResult && (
            <div className="p-3 rounded-md bg-green-500/10 text-green-600 text-sm break-all">
              ✅ Ticket Code: {scannedResult}
            </div>
          )}

          {!isScanning && (
            <Button onClick={startScan} className="w-full">
              Start Scanning
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanTicketPage;
