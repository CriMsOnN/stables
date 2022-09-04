export interface ConfigProps {
  debug: boolean;
  stables: ConfigStables;
  interaction: {
    useHorse: string;
    customizeHorse: string;
  };
}

interface ConfigStables {
  [key: string]: {
    polyZone: {
      x: number;
      y: number;
      z: number;
      length: number;
      width: number;
      options: {
        name: string;
        heading: string;
        debugPoly: boolean;
        type: string;
      };
    };
    spawnPositions: spawnPosition[];
  };
}

interface spawnPosition {
  x: number;
  y: number;
  z: number;
  h: number;
}

export interface VorpCore {
  getUser: (source: any) => getUsedCharacter;
}

interface getUsedCharacter {
  getUsedCharacter: userDetails;
}

interface coordsProps {
  x: number;
  y: number;
  z: number;
}

interface statusProps {
  Hunger: number;
  Thirst: number;
  Metabolism: number;
}

interface userDetails {
  jobGrade: number;
  rol: number;
  gold: number;
  charIdentifier: number;
  comps: string[];
  group: number;
  firstname: string;
  identifier: string;
  status: statusProps;
  staminaOuter: number;
  skin: string[];
  xp: number;
  coords: coordsProps;
  money: number;
  lastname: string;
  hours: number;
  inventory: string[];
  healthOuter: number;
  staminaInner: number;
  job: string;
  healthInner: number;
}

export interface Component {
  [key: string]: ClotheComponent;
}

interface ClotheComponent {
  hashname: string;
  category_hashname: string;
  ped_type: string;
  category_hash: number;
  hash: number;
  hash_dec_signed: number;
  category_hash_dec_signed: number;
}
