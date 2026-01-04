import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AGE_VERIFIED_KEY = "age_verified";

export function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(AGE_VERIFIED_KEY);
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(AGE_VERIFIED_KEY, "true");
    setIsOpen(false);
  };

  const handleDeny = () => {
    window.location.href = "https://google.com";
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-md border-primary/20 bg-card sm:rounded-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
            <span className="text-4xl font-bold text-primary-foreground">18+</span>
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Подтверждение возраста
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Данный сайт содержит информацию о табачной продукции. Для доступа вам
            должно быть не менее 18 лет.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="gradient"
            size="lg"
            className="flex-1"
            onClick={handleConfirm}
          >
            Мне есть 18 лет
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={handleDeny}
          >
            Мне нет 18 лет
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
