/* eslint-disable react/prop-types */
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, CardMedia, MobileStepper, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const ImageCarousel = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <Box position="relative" sx={{ height: "140px", marginBottom: "5px" }}>
      {" "}
      <SwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
        {images.map((image, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <CardMedia
                component="img"
                height="140" // ✅ Reduced height for a compact design
                sx={{ objectFit: "contain" }}
                image={image}
                alt={`Product Image ${index + 1}`}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.4)",
        }}
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        <KeyboardArrowLeft sx={{ color: "white" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.4)",
        }}
        onClick={handleNext}
        disabled={activeStep === images.length - 1}
      >
        <KeyboardArrowRight sx={{ color: "white" }} />
      </IconButton>
      <MobileStepper
        steps={images.length}
        position="static"
        activeStep={activeStep}
        nextButton={null}
        backButton={null}
        sx={{ bgcolor: "transparent", justifyContent: "center", mt: -1 }} // ✅ Reduced margin-top for stepper
      />
    </Box>
  );
};

export default ImageCarousel;
