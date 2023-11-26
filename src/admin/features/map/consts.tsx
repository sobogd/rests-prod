import {
  Balcony,
  EventSeat,
  Countertops,
  Deck,
  DeleteOutline,
  Grass,
  Info,
  LocalBar,
  LocalFlorist,
  MeetingRoom,
  SportsEsports,
  TableBar,
  TableRestaurant,
  VolumeUp,
  Wc,
  Park,
  Lightbulb,
  Storage,
} from "@mui/icons-material";
import { ETableTypes } from "./enums";
import { ITablesState } from "./types";

export const CTablesInitialState: ITablesState = {
  items: [],
  form: undefined,
  isLoading: false,
  isOpenForm: false,
};

export const CTableTypeOptions: { code: ETableTypes; name: string }[] = [
  { name: "Square table", code: ETableTypes.TABLE_SQUARE },
  { name: "Circle table", code: ETableTypes.TABLE_CIRCLE },
  { name: "Flower", code: ETableTypes.FLOWER },
  { name: "Door", code: ETableTypes.DOOR },
  { name: "Window", code: ETableTypes.WINDOW },
  { name: "Kitchen", code: ETableTypes.KITCHEN },
  { name: "Grass", code: ETableTypes.GRASS },
  { name: "Pavilion", code: ETableTypes.PAVILION },
  { name: "Chair", code: ETableTypes.CHAIR },
  { name: "Info", code: ETableTypes.INFO },
  { name: "Trash", code: ETableTypes.TRASH },
  { name: "WC", code: ETableTypes.WC },
  { name: "Bar", code: ETableTypes.BAR },
  { name: "Play", code: ETableTypes.PLAY },
  { name: "Music", code: ETableTypes.MUSIC },
  { name: "Tree", code: ETableTypes.TREE },
  { name: "Storage", code: ETableTypes.STORAGE },
  { name: "Light", code: ETableTypes.LIGHT },
];

export const CTableTypesIcons: any = {
  [ETableTypes.TABLE_SQUARE]: <TableRestaurant />,
  [ETableTypes.TABLE_CIRCLE]: <TableBar />,
  [ETableTypes.WALL]: null,
  [ETableTypes.FLOWER]: <LocalFlorist />,
  [ETableTypes.DOOR]: <MeetingRoom />,
  [ETableTypes.WINDOW]: <Balcony />,
  [ETableTypes.KITCHEN]: <Countertops />,
  [ETableTypes.GRASS]: <Grass />,
  [ETableTypes.PAVILION]: <Deck />,
  [ETableTypes.CHAIR]: <EventSeat />,
  [ETableTypes.INFO]: <Info />,
  [ETableTypes.TRASH]: <DeleteOutline />,
  [ETableTypes.WC]: <Wc />,
  [ETableTypes.BAR]: <LocalBar />,
  [ETableTypes.PLAY]: <SportsEsports />,
  [ETableTypes.MUSIC]: <VolumeUp />,
  [ETableTypes.TREE]: <Park />,
  [ETableTypes.STORAGE]: <Storage />,
  [ETableTypes.LIGHT]: <Lightbulb />,
};