import React from "react";
import Search from "../../components/search/index";

interface SearchPageProps {
  savedImdbUserId: string | null;
}

const SearchPage: React.FC<SearchPageProps> = ({ savedImdbUserId }) => {
  return <Search savedImdbUserId={savedImdbUserId} />;
};

export default SearchPage;
