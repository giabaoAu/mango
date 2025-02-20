import ProjectCard from "@/components/ui/ProjectCard";
import SearchForm from "../../components/SearchForm";

export default async function Home( { searchParams } : {
  searchParams: Promise<{ query: string; }>;
}) {
  const query = (await searchParams).query;
  const posts = [{
    _createdAt: new Date(),     // date created here is not a valid string
    views: 55,
    author: { _id: 1, name: 'John Doe' },
    _id: 1,
    description: 'This projects aims to create a new way to connect with other developers',
    image: 'https://d3ui957tjb5bqd.cloudfront.net/uploads/2021/12/23072553/9-Project-Ideas-for-a-Graphic-Design-Portfolio_FeaturedImage_Horizontal-2.jpg',
    category: 'Web Development',
    title: 'WebFun',
  }];

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

