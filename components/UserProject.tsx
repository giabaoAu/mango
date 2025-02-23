import { client } from "@/sanity/lib/client"
import { PROJECTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import ProjectCard, { ProjectCardType } from "./ui/ProjectCard";

const UserProject = async ({id} : {id:string}) => {
  const projects = await client.fetch(PROJECTS_BY_AUTHOR_QUERY, { id });
  
  return (
    <>
    { projects.length > 0 ? projects.map((project: ProjectCardType) => (
        <ProjectCard 
            key={project._id}
            post={project}
        />  
        )) : (
            <p className="no-result">No projects yet...</p>
        )
    };

    </>
  )
}

export default UserProject