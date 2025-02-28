"use client";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ColorStar } from "@/components/icons";

const RateModal = ({ bkTitle }: { bkTitle: string }) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const [submitting, setSubmitting] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(false);
  const labels: { [index: string]: string } = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertVisible(false);
  };
  return (
    <>
      <Popover
        placement="bottom"
        showArrow
        shadow="md"
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            variant="light"
            className="data-[hover=true]:bg-transparent"
            disableRipple
          >
            <ColorStar width={24} height={24} />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p
                className="text-small font-bold text-foreground"
                {...titleProps}
              >
                Rate this novel
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon
                        style={{ opacity: 0.55 }}
                        fontSize="inherit"
                        className="dark:text-white"
                      />
                    }
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
                <Button
                  color="primary"
                  radius="sm"
                  className="mt-auto"
                  isLoading={submitting}
                  onPress={async () => {
                    "use client";
                    setSubmitting(true);
                    const axios = (await import("axios")).default;
                    await axios
                      .post("/api/data/addRating", {
                        stars: value,
                        title: bkTitle,
                      })
                      .then((response) => {
                        if (response.data.message === "Success") {
                          setSubmitting(false);
                          setModalOpen(false);
                          setAlertVisible(true);
                        } else {
                          setSubmitting(false);
                        }
                      });
                  }}
                >
                  {submitting ? `Submitting` : `Submit`}
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <Snackbar
        open={alertVisible}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity="success"
          title="Success Notification"
          variant="filled"
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          Your rating has been added successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default RateModal;
