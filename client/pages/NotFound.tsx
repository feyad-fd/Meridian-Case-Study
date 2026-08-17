import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: ", location.pathname);
  }, [location.pathname]);

  return (
    <section className="py-24">
      <div className="container text-center">
        <h1 className="font-display text-5xl font-extrabold">404</h1>
        <p className="text-muted-foreground mt-2">Page not found</p>
        <a href="/" className="inline-flex mt-6 rounded-pill gradient-pill px-6 py-3 text-primary-foreground font-semibold shadow-md">Go home</a>
      </div>
    </section>
  );
};

export default NotFound;
