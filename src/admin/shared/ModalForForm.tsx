import React, { FC, PropsWithChildren } from "react";
import { backgroundDefault, borderColorDefault } from "../app/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

interface ModalForFormProps {
  open: boolean;
  maxWidth?: number;
  minWidth?: number;
  title?: string;
  id?: string;
  onCloseModal: () => void;
}

export const ModalForForm: FC<PropsWithChildren<ModalForFormProps>> = ({
  open,
  maxWidth,
  minWidth,
  title,
  onCloseModal,
  children,
  id,
}) => {
  return (
    <Modal
      open={open}
      sx={{
        ".MuiBackdrop-root": {
          backgroundColor: backgroundDefault,
          opacity: "0.95 !important",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
      id={id}
    >
      <Stack
        justifyContent="center"
        position="relative"
        maxHeight={{ xs: "calc(100% - 10px)", md: "calc(100% - 48px)" }}
        padding={3}
        paddingBottom={0}
        borderRadius={4}
        border={1}
        margin={{ xs: "5px", md: "24px" }}
        maxWidth={maxWidth}
        minWidth={minWidth}
        width="70vh"
        borderColor={borderColorDefault}
        sx={{ background: backgroundDefault }}
      >
        {title != null && (
          <Typography
            variant="h2"
            borderBottom={1}
            paddingBottom={2}
            marginTop={-0.5}
            borderColor={borderColorDefault}
            marginX={-3}
            paddingX={3}
            flex="1 0 100%"
          >
            {title}
          </Typography>
        )}
        <Button
          onClick={onCloseModal}
          color="error"
          variant="contained"
          sx={{
            position: "absolute",
            top: "-15px",
            right: "-15px",
            height: 40,
            width: 40,
            minWidth: 40,
            zIndex: 2,
            borderRadius: 20,
            padding: 0,
            svg: { fontSize: 20 },
          }}
        >
          <CloseIcon />
        </Button>
        <Box
          sx={{
            overflow: "hidden scroll",
            width: "calc(100% + 40px)",
            maxWidth: "calc(100vw - 40px)",
            margin: "0 -20px",
            padding: 2,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Modal>
  );
};
