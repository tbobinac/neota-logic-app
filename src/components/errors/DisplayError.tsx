import { TriangleAlertIcon } from "lucide-react";
import { Button } from "../ui/button";

interface DisplayError {
  action: () => void;
}

export const DisplayError = ({ action }: DisplayError) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <TriangleAlertIcon className="size-8 text-destructive" />
      <p className="text-base font-medium">Couldn't load air quality data</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Something went wrong while fetching the data. Please try again in a
        moment.
      </p>
      <Button variant="outline" onClick={() => action()}>
        Try again
      </Button>
    </div>
  );
};
