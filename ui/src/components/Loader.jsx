import { useContext } from "react";
import { LoaderContext } from "./LoaderContext";

const Loader = () => {
  const { spinner } = useContext(LoaderContext);

  if (!spinner) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
