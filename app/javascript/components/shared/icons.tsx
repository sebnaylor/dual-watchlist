import {
  Check,
  Share2,
  Plus,
  Tv,
  Info,
  Heart,
  Search,
  GitMerge,
  Copy,
  Moon,
  Sun,
} from "lucide-react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const TickIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "white",
  className,
}) => <Check width={width} height={height} color={color} className={className} />;

const ShareIcon: React.FC<IconProps> = ({
  width = 25,
  height = 25,
  color = "white",
  className,
}) => <Share2 width={width} height={height} color={color} className={className} />;

const PlusIcon: React.FC<IconProps> = ({
  width = 17,
  height = 17,
  color = "white",
  className,
}) => <Plus width={width} height={height} color={color} className={className} />;

const TvIcon: React.FC<IconProps> = ({
  width = 25,
  height = 25,
  color = "white",
  className,
}) => <Tv width={width} height={height} color={color} className={className} />;

const TooltipIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "white",
  className,
}) => <Info width={width} height={height} color={color} className={className} />;

const HeartIconFilled: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "#f05542",
  className,
}) => (
  <Heart
    width={width}
    height={height}
    color={color}
    fill={color}
    className={className}
  />
);

const HeartIconOutline: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "black",
  className,
}) => (
  <Heart
    width={width}
    height={height}
    color={color}
    fill="none"
    className={className}
  />
);

const SearchIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "white",
  className,
}) => <Search width={width} height={height} color={color} className={className} />;

const MergeIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "white",
  className,
}) => (
  <GitMerge
    width={width}
    height={height}
    color={color}
    className={className}
    style={{ transform: "rotate(270deg)" }}
  />
);

const CopyIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "white",
  className,
}) => <Copy width={width} height={height} color={color} className={className} />;

const MoonIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "white",
  className,
}) => <Moon width={width} height={height} color={color} className={className} />;

const SunIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "white",
  className,
}) => <Sun width={width} height={height} color={color} className={className} />;

export {
  ShareIcon,
  TickIcon,
  PlusIcon,
  TvIcon,
  TooltipIcon,
  HeartIconFilled,
  HeartIconOutline,
  SearchIcon,
  MergeIcon,
  CopyIcon,
  MoonIcon,
  SunIcon,
};
