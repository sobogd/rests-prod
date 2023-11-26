import { styled } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { primaryColor } from "../app/styles";
import { deepPurple } from "@mui/material/colors";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type IGraphLines = {
  label: string;
  value: number;
  separating: {
    label: string;
    value: number;
  }[];
};

type IGraphRestHorizontalProps = {
  options: IGraphLines[];
};

const GraphContainer = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 300px;
  align-items: flex-end;
  position: relative;
`;

const GraphLine = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 0 1px;
  border-radius: 8px;
  overflow: hidden;
`;

const GraphLineBlock = styled("div")`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const GraphContentBox = styled("div")<{ isShowing: boolean }>`
  cursor: pointer;
  background: #f9f7ff;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: rgba(43, 13, 98, 0.1) 0 4px 35px;
  position: absolute;
  top: 10%;
  left: 5%;
  display: ${(p) => (!!p.isShowing ? "flex" : "none")};
  flex-direction: column;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
  }
`;

const getColorByIndex = (index: number) => {
  switch (index) {
    case 0:
      return deepPurple[200];
    case 1:
      return deepPurple[400];
    case 2:
      return deepPurple[600];
    default:
      return primaryColor;
  }
};

export const GraphRestHorizontal: FC<IGraphRestHorizontalProps> = ({
  options,
}) => {
  const maxValue = Math.max(...options.map((option) => option.value));
  const [contentBox, setContentBox] = useState<ReactNode | null>(null);

  const renderSeparationBlocks = (
    separating: {
      label: string;
      value: number;
    }[]
  ) => {
    const maxValue = Math.max(...separating.map((block) => block.value));
    return (
      <>
        {separating.map((subBlock, index) => (
          <GraphLineBlock
            style={{
              height: !!subBlock.value
                ? (subBlock.value * 100) / maxValue + "%"
                : 0,
              background: getColorByIndex(index),
            }}
          />
        ))}
      </>
    );
  };

  const formatter = new Intl.NumberFormat("en-US");

  return (
    <GraphContainer>
      {options.map((option, index) => (
        <GraphLine
          style={{
            height: !!option.value ? (option.value * 100) / maxValue + "%" : 0,
            width: 100 / options.length + "%",
            background: primaryColor,
          }}
          key={option.label + index}
          onClick={() => {
            !!option.separating?.length &&
              setContentBox(
                <>
                  <span style={{ paddingBottom: 2, fontWeight: 600 }}>
                    {option.label}
                  </span>
                  {option.separating.map((s) => (
                    <span>
                      {s.label}: {formatter.format(s.value)}
                    </span>
                  ))}
                  <span>Total: {formatter.format(option.value)}</span>
                </>
              );
          }}
        >
          {!!option.separating?.length &&
            renderSeparationBlocks(option.separating)}
        </GraphLine>
      ))}
      <GraphContentBox
        isShowing={!!contentBox}
        sx={{ padding: { xs: 2, md: 3 }, paddingRight: { xs: 6, md: 6 } }}
      >
        <HighlightOffIcon onClick={() => setContentBox(null)} />
        {contentBox}
      </GraphContentBox>
    </GraphContainer>
  );
};
