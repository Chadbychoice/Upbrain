import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuth } from "../hooks/useAuth";
import { useStreakStore } from "../store/useStreakStore";
import { useState } from "react";

export function Profile() {
    const { user, logout } = useAuth();
    const { resetStreak } = useStreakStore();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleResetStreak = async () => {
        await resetStreak();
        setSuccessMessage("Streak reset successfully!");
        setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
        handleOpen()
    };

    const handleConfirmReset = async () => {
        await resetStreak();
        setSuccessMessage("Streak reset successfully!");
        setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
        handleOpen()
    };

    const dialog = (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Confirmation</DialogHeader>
            <DialogBody>
                <Typography variant="h5">Are you sure you want to reset your streak?</Typography>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="blue-gray" onClick={handleOpen} className="mr-1">
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="red" onClick={handleConfirmReset}>Reset</Button>
            </DialogFooter>
        </Dialog>)

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Profile
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h5" color="blue-gray">

            Email:
          </Typography>
          <Typography color="gray" className="font-normal">
            {user?.email || "N/A"}
          </Typography>
          <Button color="blue" onClick={handleResetStreak} className="mt-4">
            Reset Day Counter
          </Button>
          <div className="text-red-500">
              {dialog}
          </Button>
          {successMessage && (
            <Typography className="mt-2">
              <span className="text-green-500">{successMessage}</span>
            </Typography>
          )}
          <Button color="red" onClick={handleLogout} className="mt-4">
            Logout{" "}
          </Button>{" "}
        </CardBody>
      </Card>
    </div>
  );
}