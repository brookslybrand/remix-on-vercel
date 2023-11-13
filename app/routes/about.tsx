import { Link } from "@remix-run/react";

export default function About() {
  return (
    <div>
      <h1>The about page</h1>
      <p>Notice, there's no header on this page</p>
      <Link className="text-blue-800 hover:text-blue-600" to="/">
        This place is scary, go back home?
      </Link>
    </div>
  );
}
