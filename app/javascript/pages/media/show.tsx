import React from "react";
import MediaShow, { MediaShowProps } from "../../components/media/show";

const MediaShowPage: React.FC<MediaShowProps> = (props) => {
  return <MediaShow {...props} />;
};

export default MediaShowPage;
