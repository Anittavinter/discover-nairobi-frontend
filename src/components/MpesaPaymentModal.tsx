import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, Smartphone } from "lucide-react";

interface MpesaPaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  eventTitle: string;
  onSuccess: () => void;
}

type PaymentStep = "phone" | "processing" | "pin" | "success" | "failed";

export function MpesaPaymentModal({
  open,
  onClose,
  amount,
  eventTitle,
  onSuccess,
}: MpesaPaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<PaymentStep>("phone");
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (open) {
      setPhoneNumber("");
      setStep("phone");
      setPin("");
    }
  }, [open]);

  const handleSubmitPhone = () => {
    if (phoneNumber.length < 10) return;
    
    // Simulate STK Push
    setStep("processing");
    setTimeout(() => {
      setStep("pin");
    }, 2000);
  };

  const handlePinInput = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      
      if (value.length === 4) {
        // Simulate payment processing
        setTimeout(() => {
          setStep("processing");
          setTimeout(() => {
            // 90% success rate simulation
            const success = Math.random() > 0.1;
            if (success) {
              setStep("success");
              setTimeout(() => {
                onSuccess();
              }, 1500);
            } else {
              setStep("failed");
            }
          }, 2000);
        }, 500);
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      return "254" + cleaned.slice(1);
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.length <= 12) {
      setPhoneNumber(formatted);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            M-PESA Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Phone Number Step */}
          {step === "phone" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">M-PESA Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="254712345678"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  data-testid="input-mpesa-phone"
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Safaricom number
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-medium">{eventTitle}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">KSh {amount.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handleSubmitPhone}
                disabled={phoneNumber.length < 10}
                className="w-full bg-green-600 hover:bg-green-700"
                data-testid="button-send-stk"
              >
                Send Payment Request
              </Button>
            </>
          )}

          {/* Processing STK Push */}
          {step === "processing" && (
            <div className="py-8 text-center space-y-4">
              <Loader2 className="w-16 h-16 mx-auto animate-spin text-green-600" />
              <div>
                <h3 className="font-semibold text-lg">Processing Payment</h3>
                <p className="text-sm text-muted-foreground">
                  {step === "processing" && pin.length === 0
                    ? "Check your phone for STK push..."
                    : "Confirming transaction..."}
                </p>
              </div>
            </div>
          )}

          {/* PIN Entry Step */}
          {step === "pin" && (
            <div className="py-6 space-y-6">
              <div className="text-center space-y-2">
                <Smartphone className="w-12 h-12 mx-auto text-green-600" />
                <h3 className="font-semibold text-lg">Enter M-PESA PIN</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your 4-digit M-PESA PIN
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl font-bold ${
                      pin.length > i
                        ? "border-green-600 bg-green-50 dark:bg-green-950"
                        : "border-muted"
                    }`}
                  >
                    {pin.length > i ? "•" : ""}
                  </div>
                ))}
              </div>

              <Input
                type="tel"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => handlePinInput(e.target.value)}
                className="sr-only"
                autoFocus
                data-testid="input-mpesa-pin"
              />

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "⌫"].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    className="h-14 text-lg font-semibold"
                    onClick={() => {
                      if (num === "⌫") {
                        setPin(pin.slice(0, -1));
                      } else if (num !== "." && pin.length < 4) {
                        setPin(pin + num);
                      }
                    }}
                    data-testid={`button-pin-${num}`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 mx-auto text-green-600" />
              <div>
                <h3 className="font-semibold text-lg text-green-600">Payment Successful!</h3>
                <p className="text-sm text-muted-foreground">
                  KSh {amount.toLocaleString()} paid via M-PESA
                </p>
              </div>
            </div>
          )}

          {/* Failed */}
          {step === "failed" && (
            <div className="py-8 text-center space-y-4">
              <XCircle className="w-16 h-16 mx-auto text-destructive" />
              <div>
                <h3 className="font-semibold text-lg text-destructive">Payment Failed</h3>
                <p className="text-sm text-muted-foreground">
                  Please try again or use a different payment method
                </p>
              </div>
              <Button
                onClick={() => {
                  setStep("phone");
                  setPin("");
                }}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}