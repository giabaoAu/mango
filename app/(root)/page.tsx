import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Project, <br /> Connect with other dev</h1>
        <p className="sub-heading !max-w-3xl">
          Share Your Ideas, Cast Your Votes, and Shine in Online Competitions.
        </p>
        <SearchForm />
      </section>
    </>
  );
}
