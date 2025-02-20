import ProjectCard, { ProjectCardType } from "@/components/ui/ProjectCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

export default async function Home( { searchParams } : {
  searchParams: Promise<{ query: string; }>;
}) {
  const query = (await searchParams).query;
  const posts = await client.fetch(PROJECTS_QUERY);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Projects, <br /> Connect with other Dev</h1>
        <p className="sub-heading !max-w-3xl">
          Share Your Ideas, Cast Your Votes, and Shine in Online Competitions.
        </p>
        <SearchForm query={ query } />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          { query ? `Search resutls for "${query}"`: 'All Projects' }
        </p>

        {/* Display thhe project posts only if there are any */}
        <ul className="mt-7 card_grid">
          { posts?.length > 0 ? (
            posts.map((post: ProjectCardType) => (
              <ProjectCard key={post?._id} post={post}/>
            ))
          ) : <p className="no-results">No projects found</p>}
        </ul>
      </section>
    </>
  );
}

